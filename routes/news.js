var express = require('express');
var newsModel = require('../models/news');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
var newsendPoints = {
    getNewsList: '/getnewslist',
    getNewsDetails: '/getnewsdetails',
    addNews: '/addnews',
    updateNews: '/updatenews'
};
var imageAssetsPath = 'uploads/images/';

var router = express.Router();

function makeResponse(code, data, msg) {
    if (data) { return { status: code, data: data } }
    else if (msg) { return { status: code, msg: msg } }
};

function makeParam(reqData) {
    if (reqData.file) {
        reqData.body.image_url =  imageAssetsPath + reqData.file.originalname;
    }
    return reqData.body;
};

router.get(newsendPoints.getNewsList, (req, res) => {    
    newsModel.findAll()
    .then(news => {
        res.status(200).send(makeResponse(200, news, "Successful"));
        res.end();
    })
    .catch(err => {
        res.status(500).send(makeResponse(500, null, "Something went wrong"));
        res.end();
    })
})

router.get(newsendPoints.getNewsDetails, async (req, res) => {
    try {
        let result = await newsModel.findAll({ where : {id: req.query.id} })
        res.status(200).send(makeResponse(200, result[0], "Successful"));
    }
    catch(err) {
        res.status(500).send(makeResponse(500, null, "Something went wrong"));
    }
})

router.post(newsendPoints.addNews, upload.single('file'), (req, res) => {
    const reqData = req;
    const param = makeParam(reqData);
    newsModel.create(param)
    .then(() => {
        res.status(200).send(makeResponse(200, null, 'Data saved successfully'));
        res.end();
    })
});

router.put(newsendPoints.updateNews, upload.single('file'), (req, res) => {
    const reqData = req;
    const param = makeParam(reqData);
    
    newsModel.update(param, { where : {id: param.id}})
    .then(() => {
        res.status(200).send(makeResponse(200, null, 'Data updated successfully'));
        res.end();
    })
    .catch(err => {
        res.status(500).send(makeResponse(500, null, "Something went wrong"));
        res.end();
    })
})

module.exports = router;