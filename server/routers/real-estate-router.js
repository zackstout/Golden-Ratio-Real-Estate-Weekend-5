
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, city: String, values: Number});
var ListingSchema = new Schema({cost: Number, sqft: Number, city: String, values: Number});
// var FaveSchema = new Schema({moneys: Number, sqft: Number, city: String, values: Number});


var Rental = mongoose.model('Rentals', RentalSchema, 'rentals');
var Listing = mongoose.model('Listings', ListingSchema, 'listings');
// var Fave = mongoose.model('Favorites', FaveSchema, 'faves');

mongoose.Promise = global.Promise;

//Rentals Routes:
router.get('/rentals', function(req, res) {
  Rental.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});


router.get('/rentals/value', function(req, res) {
  Rental.find({}, null, {sort: {values: -1}, limit: 6}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {

      // console.log(foundRealEstate);
      res.send(foundRealEstate);
    }
  });
});



// the following four routes should be condensed into one:
router.get('/rentals/order/rent/desc', function(req, res) {
  Rental.find({}, null, {sort: {rent: -1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/rentals/order/rent/asc', function(req, res) {
  Rental.find({}, null, {sort: {rent: 1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/rentals/order/size/desc', function(req, res) {
  Rental.find({}, null, {sort: {sqft: -1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/rentals/order/size/asc', function(req, res) {
  Rental.find({}, null, {sort: {sqft: 1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});




router.get('/rentals/search/:id', function(req, res) {
  console.log(req.params.id);
  // var regEx = new RegExp('req.params.id', i);
  Rental.find({"city": {$regex: req.params.id}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});


router.post('/rentals', function(req, res) {
  console.log(req.body);
  var property = new Rental(req.body);
  property.save(function(err, data) {
    if (err) {
      console.log('ooooops');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// router.post('/favorites/rentals', function(req, res) {
//   console.log(req.body);
//   var obj = req.body;
//   obj.moneys = req.body.rent;
//
//   var property = new Fave(obj);
//   console.log(property);
//   property.save(function(err, data) {
//     if (err) {
//       console.log('ooooops');
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });
//
// router.post('/favorites/listings', function(req, res) {
//   console.log(req.body);
//   req.body.moneys = req.body.cost;
//
//
//   var property = new Fave(req.body);
//   console.log(property);
//   property.save(function(err, data) {
//     if (err) {
//       console.log('ooooops');
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

router.delete('/rentals/:id', function(req, res) {
  var propertyId = req.params.id;
  //the _id needn't be in quotes, but if the thing's name had a dot, we would need quotes:
  Rental.findByIdAndRemove({"_id": propertyId}, function(err, data) {
    if (err) {
      console.log('noooo');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/rentals/:id', function(req, res) {
  var propertyId = req.params.id;
  console.log(req.body);

  Rental.findByIdAndUpdate({"_id": propertyId}, {
    "rent": req.body.rent,
    "sqft": req.body.sqft,
    "city": req.body.city,
    "values": req.body.values
  }, function(err, data) {
    if (err) {
      console.log('noooo', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});






//Listing Routes:
//I wonder if these could also be wrapped up in above functions with a variable, rather than just replicating all the same stuff in a new router:
router.get('/listings', function(req, res) {
  Listing.find({}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.post('/listings', function(req, res) {
  console.log(req.body);
  var property = new Listing(req.body);
  property.save(function(err, data) {
    if (err) {
      console.log('ooooops');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});



router.delete('/listings/:id', function(req, res) {
  var propertyId = req.params.id;
  //the _id needn't be in quotes, but if the thing's name had a dot, we would need quotes:
  Listing.findByIdAndRemove({"_id": propertyId}, function(err, data) {
    if (err) {
      console.log('noooo');
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

router.put('/listings/:id', function(req, res) {
  var propertyId = req.params.id;
  console.log(req.body);

  Listing.findByIdAndUpdate({"_id": propertyId}, {
    "cost": req.body.cost,
    "sqft": req.body.sqft,
    "city": req.body.city,
    "values": req.body.values
  }, function(err, data) {
    if (err) {
      console.log('noooo', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


router.get('/listings/value', function(req, res) {
  Listing.find({}, null, {sort: {values: -1}, limit: 6}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops');
      res.sendStatus(500);
    } else {

      // console.log(foundRealEstate);
      res.send(foundRealEstate);
    }
  });
});



// the following four routes should be condensed into one:
router.get('/listings/order/cost/desc', function(req, res) {
  Listing.find({}, null, {sort: {cost: -1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/listings/order/cost/asc', function(req, res) {
  Listing.find({}, null, {sort: {cost: 1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/listings/order/size/desc', function(req, res) {
  Listing.find({}, null, {sort: {sqft: -1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});

router.get('/listings/order/size/asc', function(req, res) {
  Listing.find({}, null, {sort: {sqft: 1}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});




router.get('/listings/search/:id', function(req, res) {
  console.log(req.params.id);
  // var regEx = new RegExp('req.params.id', i);
  Listing.find({"city": {$regex: req.params.id}}, function(err, foundRealEstate) {
    if (err) {
      console.log('whoooops', err);
      res.sendStatus(500);
    } else {
      res.send(foundRealEstate);
    }
  });
});



module.exports = router;
