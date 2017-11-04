
var express = require('express');
var app = express();

var port = process.env.PORT || 6660;
var bodyParser = require('body-parser');

var router = require('./routers/real-estate-router.js');

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.use('/realestate', router);

var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/realestate';

mongoose.connection.on('connected', function() {
  console.log('we in!');
});

mongoose.connection.on('error', function() {
  console.log("aw nuts bro");
});

//initiate connection:
mongoose.connect(databaseUrl);

app.listen(port, function (req, res) {
  console.log('Listening on port', port);
});
