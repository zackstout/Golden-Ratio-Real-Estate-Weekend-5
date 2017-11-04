
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RealEstateSchema = new Schema({cost: Number, size: Number, location: String});

var Rentals = mongoose.model('Rentals', RealEstateSchema, 'rentals');
var Listings = mongoose.model('Listings', RealEstateSchema, 'listings');

router.get('/rentals', function(req, res) {
  Rentals.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/listings', function(req, res) {
  Listings.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

module.exports = router;
