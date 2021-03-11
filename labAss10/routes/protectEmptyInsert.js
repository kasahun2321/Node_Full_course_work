var express = require('express');
var router = express.Router();

function checkValidity(req, res, next) {
    if (req.body.id === "" || req.body.name === "" || req.body.course === "" || req.body.grade === "") {
        res.json({ Status: "invalid not accept empty key value pair" })
    } else {
        next()
    }
}
 
router.post('/', checkValidity, (req, res) => {
    req.db.collection('student').insertOne(req.body)
        .then(data => {
            res.json({ status: "Added successfully" })
        })
        .catch(err => {
            res.json(err)
        })
 
})
module.exports = router;
