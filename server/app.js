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
                    db.collection('cellrows')
                        .updateOne({ _id: data._id }, { $set: { [data.field]: data.value } })
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

//Principale

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

//Cells

app.get('/cell', (req, res) => {
    let cell = []
    db.collection('cells')
        .find()
        .forEach(c => cell.push(c))
        .then(() => {
            res.status(200).json(cell)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch Cell documents'})
        })
})

app.get('/cell/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('cells')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch Cell documents'})
        })
    } else {
        res.status(500).json({error: 'not a valid Cell id'})
    }
    
})

app.post('/postCell', (req, res) => {
    const c = req.body;
    db.collection('cells')
    .insertOne(c)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new Cell document'})

    })

})

app.post('/updateCellText', (req, res) => {
    const { _id, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection('cells')
            .updateOne({ _id: new ObjectId(_id) }, { $set: { value: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Value Updated successfully to ' + value });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.post('/updateCellNew', (req, res) => {
    const { _id, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection('cells')
            .updateOne({ _id: new ObjectId(_id) }, { $set: { [value]: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: field + ' Updated sucessfully to ' + value });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.post('/updateCellColour', (req, res) => {
    const { _id, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection('cells')
            .updateOne({ _id: new ObjectId(_id) }, { $set: { backgroundColour: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: field + ' Updated sucessfully to ' + value });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

//Rows

app.get('/rows', (req, res) => {
    let rows = []
    db.collection('rows')
        .find()
        .forEach(r => rows.push(r))
        .then(() => {
            res.status(200).json(rows)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch Rows documents'})
        })
})

app.get('/rows/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('rows')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch Rows documents'})
        })
    } else {
        res.status(500).json({error: 'not a valid Row id'})
    }
    
})

app.post('/postRow', (req, res) => {
    const r = req.body;
    db.collection('rows')
    .insertOne(r)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create a new Row document'})

    })

})

app.post('/updateRow', (req, res) => {
    const { _id, field, value } = req.body;
    
    if (ObjectId.isValid(_id)) {
        db.collection('rows')
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

//Cell Rows

app.get('/cellRows', (req, res) => {
    let cr = []
    db.collection('cellrows')
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
        db.collection('cellrows')
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

app.post('/postCellRow', (req, res) => {
    const cr = req.body;
    db.collection('cellrows')
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
        db.collection('cellrows')
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

app.post('/updateCellRowText', (req, res) => {
    const { _id, field, value } = req.body;

    if (ObjectId.isValid(_id)) {
        const updateQuery = { $set: {} };
        updateQuery.$set[field] = value;

        db.collection('cellrows')
            .updateOne({ _id: new ObjectId(_id) }, updateQuery)
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Document updated successfully' });
                } else {
                    res.status(404).json({ error: 'Document not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});

app.get('/cellRow/:id/:field', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('cellrows')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                if (doc && req.params.field in doc) {
                    res.status(200).json({ value: doc[req.params.field] });
                } else {
                    res.status(404).json({ error: 'Field not found in document' });
                }
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch document' });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
});