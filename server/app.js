const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectToDb, getDb } = require('./database/database');
const { ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let db
let collection = 'principale'
connectToDb((err) => {
    if (!err) {
        const server = http.createServer(app);
        const io = socketIo(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        io.on('connection', (socket) => {
            console.log('A user connected');

            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });

            socket.on('updateCell', (data) => {
                console.log('Received updateCell event:', data);
                if (ObjectId.isValid(data._id)) {
                    const updateQuery = { $set: {} };
                    updateQuery.$set[`${data.field.property}`] = data.value;

                    db.collection(collection)
                        .updateOne({ _id: new ObjectId(data._id) }, updateQuery)
                        .then(
                            socket.broadcast.emit('cellUpdated', data)
                        )
                        .catch(err => {
                            console.error('Error updating document:', err);
                        });
                } else {
                    console.error('Invalid document ID');
                }
            });
            
        });

        server.listen(3001, () => {
            console.log('Server is running on port 3001');
        });

        db = getDb();
    } else {
        console.error('Failed to connect to database:', err);
    }
});


app.get('/cellRows', (req, res) => {
    let cr = []
    db.collection(collection)
        .find()
        .forEach(r => cr.push(r))
        .then(() => {
            res.status(200).json(cr)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch Cell Rows documents'})
        })
})

app.get('/cellRows/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection(collection)
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch Cell Rows documents'})
        })
    } else {
        res.status(500).json({error: 'not a valid Cell Row id'})
    }
    
})

app.get('/getCellProperty/:id/:colId/:property', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection(collection)
        .findOne(
            {_id: new ObjectId(req.params.id)},
            {projection: { [`${req.params.colId}.${req.params.property}`]: 1 }}
        )
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch property ' + req.params.property})
        })
    } else {
        res.status(500).json({error: 'not a valid Cell Row id'})
    }
    
})

app.post('/postCellRow', (req, res) => {
    const cr = req.body;
    db.collection(collection)
    .insertOne(cr)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new Cell Row document'})

    })

})

app.post('/updateCellRow', (req, res) => {
    const { _id, field, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection(collection)
            .updateOne({ _id: new ObjectId(_id) }, { $set: { [field]: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Document updated successfully' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.post('/updateCellProperty', (req, res) => {
    const { _id, field, property, value } = req.body;

    if (ObjectId.isValid(_id)) {
        const updateQuery = { $set: {} };
        updateQuery.$set[`${field}.${property}`] = value;

        db.collection(collection)
            .updateOne({ _id: new ObjectId(_id) }, updateQuery)
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Property ' + property + ' updated to ' + value + ' successfully' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the property', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.post('/clearCellProperty', (req, res) => {
    const { _id, field } = req.body;

    if (!ObjectId.isValid(_id)) {
        res.status(400).json({ error: 'Invalid document ID' });
        return;
    }

    if (!field) {
        res.status(400).json({ error: 'Field name is required' });
        return;
    }

    const defaultFormatting = {
        fontFamily: "Arial",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        color: "#000000",
        backgroundColor: "",
        textAlign: "left",
        verticalAlign: "middle",
        borderTop: null,
        borderRight: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        borderLeft: null,
        wrapText: false,
        format: "text",
        locked: null,
        cellRenderer: "agTextCellEditor",
        span: 1,
        spanrow: 1
    };

    const updateQuery = {
        $set: {}
    };
    for (const key in defaultFormatting) {
        updateQuery.$set[`${field}.${key}`] = defaultFormatting[key];
    }

    db.collection(collection)
        .updateOne({ _id: new ObjectId(_id) }, updateQuery)
        .then(result => {
            if (result.modifiedCount > 0) {
                res.status(200).json({ message: 'Formatting set to default for field ' + field + ' in cell ' + _id });
            } else {
                res.status(404).json({ error: 'Document not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not set formatting properties to default', details: err });
        });
});
