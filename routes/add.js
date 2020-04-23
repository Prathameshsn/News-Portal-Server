var express = require("express");
var router = express.Router();

router.get('/getcustomadds', (req, res, next) => {
    fs.readFile('./assets/adds.json', (err, data) => {
        if (err) throw err
        res.status(200).send(JSON.parse(data));
        res.end();
    })
})

module.exports = router;