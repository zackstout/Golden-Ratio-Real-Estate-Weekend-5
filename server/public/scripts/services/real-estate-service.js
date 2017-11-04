
app.service('RealEstateService', function($http) {
  console.log('service running');
  var self = this;
  self.result = {
    rentals: [],
    listings: []
  };

  self.image = {};

  // var APIkey = 'AIzaSyCsPm4V1kjeCqOosP3N3_9d-NEgj5r166w';

  self.getRentals = function() {
    $http.get('/realestate/rentals').then(function(response) {
      console.log(response.data);
      self.result.rentals = response.data;
    }).catch(function(err) {
      console.log('whoops');
    });
  };

  self.getListings = function() {
    $http.get('/realestate/listings').then(function(response) {
      console.log(response.data);
      self.result.listings = response.data;
    }).catch(function(err) {
      console.log('whoops');
    });
  };

  self.addPlace = function(place) {
    console.log(place);

    if (place.type == "rent") {
      console.log('rental!');
      var rentalToSend = {
        rent: place.money,
        sqft: place.sqft,
        city: place.city
      };
      $http.post('/realestate/rentals', rentalToSend).then(function(response) {
        console.log('well done sir');
        self.getRentals();
      });

    } else if (place.type == "cost") {
      console.log('sale!');
      var listingToSend = {
        cost: place.money,
        sqft: place.sqft,
        city: place.city
      };
      $http.post('/realestate/listings', listingToSend).then(function(response) {
        console.log('aha yes');
        self.getListings();
      });
    }
  };
  //
  // self.addGame = function(gameToAdd) {
  //       console.log(gameToAdd);
  //       $http.post('/games', gameToAdd).then(function(response) {
  //         console.log('yup');
  //         gs.refreshGames();
  //
  //       }).catch(function(error) {
  //         console.log('nope');
  //
  //       });
  //   };



  //
  // self.getImage = function() {
  //   $http.get('https://maps.googleapis.com/maps/api/streetview?size=150x150&location=40.7,-74&key=' + APIkey).then(function(response) {
  //     console.log(response.config.url);
  //     self.image = response;
  //   }).catch(function(err) {
  //     console.log('whoops');
  //   });
  // };
  //
  // self.getImage2 = function() {
  //   $http.get('https://loremflickr.com/150/150/house').then(function(response) {
  //     console.log(response);
  //     self.image = response;
  //   }).catch(function(err) {
  //     console.log('whoops');
  //   });
  // };

});
