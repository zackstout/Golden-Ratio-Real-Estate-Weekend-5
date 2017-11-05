
app.service('RealEstateService', function($http) {
  console.log('service running');
  var self = this;
  self.result = {
    rentals: [],
    listings: [],
    best: []
  };

  self.image = {};

  // var APIkey = 'AIzaSyCsPm4V1kjeCqOosP3N3_9d-NEgj5r166w';


  self.getRentals = function() {
    $http.get('/realestate/rentals').then(function(response) {
      console.log(response.data);
      self.result.rentals = response.data;
    }).catch(function(err) {
      console.log('I have failed you');
    });
  };

  self.searchRentals = function(query) {
    console.log('we out here', query);
    $http.get('/realestate/rentals/search/' + query).then(function(response) {
      self.result.rentals = response.data;
    }).catch(function(err) {
      console.log('done messed up');
    });

  };


  self.getValues = function() {
    $http.get('/realestate/rentals/value').then(function(response) {
      console.log(response.data);

      self.result.best = response.data;
    }).catch(function(err) {
      console.log('I have failed you');
    });
  };


  self.getRentalsOrdered = function(direction, type) {
    $http.get('/realestate/rentals/order/' + type + '/' + direction).then(function(response) {
      // console.log(response.data);
      self.result.rentals = response.data;
    }).catch(function(err) {
      console.log('whoops');
    });
  };

  //same idea over here, i wonder whether we could roll listing stuff into rental functions to avoid need for another service:
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
        city: place.city,
        values: place.sqft/place.money
      };
      $http.post('/realestate/rentals', rentalToSend).then(function(response) {
        console.log('well done sir');
        swal("Well Done!", "property rental added!", "success");
        self.getRentals();
        self.getValues();
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
        swal("Well Done!", "property listing added!", "success");
        self.getListings();
      });
    }
  }; //end addPlace

  self.deleteRental = function(id) {
    swal({
      title: "Are you sure??",
      text: "should we consign this property to the flames?",
      icon: "warning",
      buttons: ['No dog!', 'Burn it!'],
      dangerMode: true
    }).then(function (willDelete) {
      if (willDelete) {
        swal("Poof!", {icon: "success"});
        $http.delete('realestate/rentals/' + id).then(function(response) {
          self.getRentals();
          self.getValues();
        }).catch(function(error) {
          console.log('nuts');
        });
      } else {
        swal("Phew!");
      }
    });
  }; //end deleteRental

  self.editRental = function(id, property) {
    console.log('hi');
    var updatedRental = {};
    swal({
      title: "Update rent",
      text: "current rent: " + property.rent,
      content: "input"
    }).then(function(val) {
      console.log(val);
      updatedRental.rent = val;
      swal({
        title: "Update size",
        text: "current size: " + property.sqft,
        content: "input"
      }).then(function(val) {
        console.log(val);
        updatedRental.sqft = val;
        swal({
          title: "Update city",
          text: "current city: " + property.city,
          content: "input"
        }).then(function(val) {
          console.log(val);
          updatedRental.city = val;
          updatedRental.values = updatedRental.sqft/updatedRental.rent;
          console.log(updatedRental);
          swal({
            title: "Save update??",
            text: "Rent: " + updatedRental.rent + ", Sqft: " + updatedRental.sqft + ", City: " + updatedRental.city,
            icon: "warning",
            buttons: ['Nope', 'Save'],
            dangerMode: true
          }).then(function(willUpdate) {
            console.log(updatedRental);
            if(willUpdate) {
              swal("Whoosh!", {icon: "success"});
              $http.put('realestate/rentals/' + id, updatedRental).then(function(response) {
                swal("Well Done!", "property rental updated!", "success");
                self.getRentals();
                self.getValues();
              }).catch(function(error) {
                console.log('shoot!!');
              });
            } else {
              swal("Close call!");
            }
          });
        });
      });
    });
  }; //end editRental




  //
  //
  //   gs.likeGame = function(gameId, game) {
  //   console.log('hi');
  //   $http.put('/games/' + gameId, game).then(function(response) {
  //     gs.refreshGames();
  //   }).catch(function(error) {
  //     console.log('nuts!!!');
  //   });
  // };
  //



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
