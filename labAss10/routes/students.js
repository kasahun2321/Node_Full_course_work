
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const morgan = require('morgan');
const { ObjectID}= require('mongodb');
router.use(morgan('combined'));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), { flags: 'a' });
router.use(morgan('combined', { stream: accessLogStream }));

router.get('/', (req, res) => {

    req.db.collection("student").find().limit(5)
        .toArray()
        .then(data => {
            console.log(data)
            res.json(data)
        })

})

router.get('/:id', function (req, res) {
    req.db.collection("student").findOne({ "_id": new ObjectID(req.params.id) })
    .then(data => {
        console.log(data)
        res.json(data)
    })
})
router.post('/', function (req, res) {
    req.db.collection("student").insertOne(req.body)
        .then(data => {
            console.log(data)
            res.json({inserteddata: data})
        })
        .catch(err => {
            console.log(err)
            res.json({ status:"Error to add data"})
        })


})
router.delete('/:id', function (req, res) {

    req.db.collection("student").removeOne({ _id: new ObjectID(req.params.id) })
        .then(data => {
            console.log(data)
            res.json({ status:"removed successfully"})
    })
        .catch(err => {
            console.log(err)
        res.json({ status: "cant find something to delete"})})

})




module.exports = router;
