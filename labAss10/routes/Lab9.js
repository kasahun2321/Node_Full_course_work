const express = require('express');
const router = express.Router();



// accesing 5 hotel from usa restaunt collection
router.get('/1', (req, res) => {

    req.db.collection("USArestaurant").find().limit(5)
        .toArray()
        .then(data => {
            console.log(data)
            res.json(data)
        })

})
router.get('/2', (req, res) => {

    req.db.collection('USArestaurant')
        .find({ cuisine: { $ne: 'American' }, 'grades.score': { $gt: 70 } })
        .toArray()
        .then(data => {
            console.log(data)
            res.json(data)
        })

})
router.get('/3', (req, res) => {
    req.db.collection('USArestaurant').
        find({ name: /^will/ }, { "restaurant_id": 1, "name": 1, "cuisine": 1 }).count()
        // .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)
        })



})
router.get('/4', (req, res) => {
    req.db.collection('USArestaurant').
        find({ name: /.*Reg.*/ }, { "restaurant_id": 1, "district": 1, "name": 1, "cuisine": 1 })
        .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)
        })
})
//
router.get('/5', (req, res) => {
    req.db.collection('USArestaurant').
        find({
            "district": "Bronx", $or: [
                { "cuisine": "American " },
                { "cuisine": "Chinese" }
            ]
        }, { "restaurant_id": 1, "district": 1, "name": 1, "cuisine": 1 })
        .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)    })
})
router.get('/6', (req, res) => {
    req.db.collection('USArestaurant').
        find({"district" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
            { "restaurant_id": 1, "district": 1, "name": 1, "cuisine": 1 }).limit(4)
        .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)    })
})
router.get('/7', (req, res) => {
    req.db.collection('USArestaurant').
        find({"district" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
            { "restaurant_id": 1, "district": 1, "name": 1, "cuisine": 1 }).limit(4)
        .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)    })
})
router.get('/8', (req, res) => {
    req.db.collection('USArestaurant').
        find({'grades.score':{$ne:10}},
            { "restaurant_id": 1, "district": 1, "name": 1, "cuisine": 1 }).limit(4)
        .toArray()
        .then(data => {
            console.log(data, " hotel name start with will")
            res.json(data)    })
})



module.exports = router;