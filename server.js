var http = require('http');
var app = require('./util/app');

var server = http.createServer(app);
server.listen(3000);