const express = require('express');
const { connectToDb, getDb } = require('./database/database');
const { ObjectId } = require('mongodb');

const app = express();

let db
connectToDb((e) => {
    if (!e) {
        app.listen(3001, () => {
            console.log('app listening on port 3001')
        })
        db = getDb()
    } else {
        console.error('Failed to connect to database:', err);
    }
} )


app.get('/principale', (req, res) => {
    let principals = []
    db.collection('principale')
        .find()
        .sort({ author: 1 })
        .forEach(p => principals.push(p))
        .then(() => {
            res.status(200).json(principals)
        })
        .catch(() => {
            res.status(500). json({error: 'Could not fetch the docs'})
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
            res.status(500).json({error: 'Could not fetch docs'})
        })
    } else {
        res.status(500).json({error: 'not a valid id'})
    }
    
})
