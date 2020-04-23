var express = require("express");
var categoryModel = require('../models/category.js');
var router = express.Router();

var categoryendPoints = {
    get: '/getcategories',
    add: '/addcategories',
    update: 'editcategories'
}

function makeResponse(code, data, msg) {
    if (data) { return { status: code, data: data } }
    else if (msg) { return { status: code, msg: msg } }
};

router.get(categoryendPoints.get, (req, res) => {
    categoryModel.findAll()
    .then(result => {
        res.status(200).send(makeResponse(200, result, "Successful"));
    })
});

router.post(categoryendPoints.add, (req, res) => {
    categoryModel.create(req.body)
    .then(result => {
        res.status(200).send("Successful");
        res.end();
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Something went wrong");
    })
})

router.put(categoryendPoints.update, (req, res) => {
    categoryModel.update(req.body)
    .then(result => {
        res.status(200).send("Run");
    })
})

module.exports = router;