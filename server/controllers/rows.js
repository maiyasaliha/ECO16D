const { ObjectId } = require('mongodb');
const db = require('../app');

const getRows = (req, res) => {
    let principals = [];
        db.collection('principale')
        .find()
        .forEach(p => principals.push(p))
        .then(() => {
            res.status(200).json(principals);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch Principale documents' });
        });
};

const getRowsById = (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('principale')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(() => {
                res.status(500).json({ error: 'Could not fetch Principale documents' });
            });
    } else {
        res.status(500).json({ error: 'Not a valid Principale id' });
    }
};

const postRows = (req, res) => {
    const p = req.body;
    db.collection('principale')
        .insertOne(p)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new Principale document' });
        });
};

const updateRows = (req, res) => {
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
};

module.exports = {
    getRows,
    getRowsById,
    postRows,
    updateRows
};
