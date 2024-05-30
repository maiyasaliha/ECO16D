const { ObjectId } = require('mongodb');
const db = require('../database/database'); // Adjust this path to where your database connection is

const getCells = (req, res) => {
    let cells = [];
    db.collection('cells')
        .find()
        .forEach(c => cells.push(c))
        .then(() => {
            res.status(200).json(cells);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch Cell documents' });
        });
};

const getCellById = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('cells')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch Cell documents' });
            });
    } else {
        res.status(500).json({ error: 'Not a valid Cell id' });
    }
};

const postCell = (req, res) => {
    const c = req.body;
    db.collection('cells')
        .insertOne(c)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new Cell document' });
        });
};

const updateCell = (req, res) => {
    const { _id, field, value } = req.body;

    if (ObjectId.isValid(_id)) {
        db.collection('cells')
            .updateOne({ _id: new ObjectId(_id) }, { $set: { [field]: value } })
            .then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: `${field} Updated successfully to ${value}` });
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document', details: err });
            });
    } else {
        res.status(400).json({ error: 'Invalid document ID' });
    }
};

module.exports = {
    getCells,
    getCellById,
    postCell,
    updateCell
};
