var express = require('express');
var fs = require('fs');
var app = express();
var bodyparser = require('body-parser');
const cors = require('cors');

// custom imports
var newsroutes = require('../routes/news');
var addroutes = require('../routes/add');
var categoryroute = require('../routes/category');
var sequelizeConnection = require('./database');

// middleware bodyparser to parse request
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// serving static files
app.use('/uploads', express.static('assets'));

// middleware for browser header issue handle
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, Content-Type, Accept, X-Requested-With');
    res.setHeader("Access-Control-Allow-Methods", 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
    next();
});

// adding routes
app.get('/getmenus', (req, res, next) => {
    fs.readFile('./assets/jsons/menus.json', (err, data) => {
        if (err) throw err
        res.status(200).send(JSON.parse(data));
        res.end();
    })
})
app.use(newsroutes);
app.use(addroutes);
app.use(categoryroute);

sequelizeConnection.sync().then(res => {
})

module.exports = app;