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
                    db.collection('principale')
                        .updateOne({ _id: new ObjectId(data._id) }, { $set: { [data.field]: data.value } })
                        .then(result => {
                            if (result.modifiedCount > 0) {
                                socket.broadcast.emit('cellUpdated', data);
                            }
                        })
                        .catch(err => {
                            console.error('Error updating document:', err);
                        });
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


app.get('/principale', (req, res) => {
    let principals = []
    db.collection('principale')
        .find()
        .forEach(p => principals.push(p))
        .then(() => {
            res.status(200).json(principals)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch Principale documents'})
        })
})

app.get('/principale/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('principale')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch Principale documents'})
        })
    } else {
        res.status(500).json({error: 'not a valid Principale id'})
    }
    
})

app.post('/postPrincipale', (req, res) => {
    const p = req.body;
    db.collection('principale')
    .insertOne(p)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new Principale document'})

    })

})

app.post('/updatePrincipale', (req, res) => {
    const { _id, field, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection('principale')
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
