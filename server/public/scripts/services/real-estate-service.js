
app.service('RealEstateService', function($http) {
  console.log('service running');
  var self = this;
  self.result = {
    rentals: [],
    listings: [],
    best: []
  };

  // self.faves = [];

  //using promise syntax instead -- wait do we even need these?? -- yes for saving the view:
  self.rentals = [];
  self.best = [];


  self.getRentals = function() {
    return $http.get('/realestate/rentals').then(function(response) {
      console.log(response.data);
      // self.result.rentals = response.data;
      //promises:
      self.rentals = response.data;
      return response.data;
      //^Nahh that actually happens in controller methinks -- but also here
    }).catch(function(err) {
      console.log('I have failed you');
    });
  };

  self.searchRentals = function(query) {
    console.log('we out here', query);
    return $http.get('/realestate/rentals/search/' + query).then(function(response) {
      // self.result.rentals = response.data;
      //promises:
      self.rentals = response.data;
      return response.data;
    }).catch(function(err) {
      console.log('done messed up');
    });

  };


  self.getValues = function() {
    return $http.get('/realestate/rentals/value').then(function(response) {
      console.log(response.data);

      // self.result.best = response.data;
      //promises:
      self.best = response.data;
      return response.data;
    }).catch(function(err) {
      console.log('I have failed you');
    });
  };
  //
  // self.addFaveList = function(id, property) {
  //   console.log(id, property, "servicin list");
  //   $http.post('/realestate/favorites/listings', property).then(function(response) {
  //     console.log('well done sir');
  //     swal("Well Done!", "new favorite added!", "success");
  //     self.getListings();
  //     self.getValuesList();
  //   });
  // };
  //
  // self.addFaveRental = function(id, property) {
  //   console.log(id, property, "servicin rent");
  //   $http.post('/realestate/favorites/rentals', property).then(function(response) {
  //     console.log('well done sir');
  //     swal("Well Done!", "new favorite added!", "success");
  //     self.getRentals();
  //     self.getValues();
  //   });
  // };
  //
  // self.getFaves = function() {
  //   $http.get('/realestate/favorites'......)
  // }

  self.getRentalsOrdered = function(direction, type) {
    return $http.get('/realestate/rentals/order/' + type + '/' + direction).then(function(response) {
      // console.log(response.data);
      // self.result.rentals = response.data;
      //promises:
      self.rentals = response.data;
      return response.data;
    }).catch(function(err) {
      console.log('whoops');
    });
  };


  self.addRental = function(place) {
    console.log(place);

      console.log('rental!');
      var rentalToSend = {
        rent: place.money,
        sqft: place.sqft,
        city: place.city,
        values: Math.round(1000*place.sqft/place.money)/1000
      };
      $http.post('/realestate/rentals', rentalToSend).then(function(response) {
        console.log('well done sir');
        swal("Well Done!", "property rental added!", "success");
        self.getRentals();
        self.getValues();
      });


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

});
