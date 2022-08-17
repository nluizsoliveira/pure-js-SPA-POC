var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname, 'public');

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));

app.listen(8080);