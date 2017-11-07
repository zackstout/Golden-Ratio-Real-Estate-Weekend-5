
app.service('ListingService', function($http) {
  console.log('listing service running');
  var self = this;
  self.result = {
    rentals: [],
    listings: [],
    bestList: []
  };


  self.searchListings = function(query) {
    console.log('we out here', query);
    $http.get('/realestate/listings/search/' + query).then(function(response) {
      self.result.listings = response.data;
    }).catch(function(err) {
      console.log('done messed up');
    });

  };

    self.getValuesList = function() {
      $http.get('/realestate/listings/value').then(function(response) {
        console.log(response.data);

        self.result.bestList = response.data;
      }).catch(function(err) {
        console.log('I have failed you');
      });
    };

  self.getListingsOrdered = function(direction, type) {
    $http.get('/realestate/listings/order/' + type + '/' + direction).then(function(response) {
      // console.log(response.data);
      self.result.listings = response.data;
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

  self.addListing = function(place) {
    console.log(place);

      console.log('sale!');
      var listingToSend = {
        cost: place.money,
        sqft: place.sqft,
        city: place.city,
        values: Math.round(1000*place.sqft/place.money)/1000
      };
      $http.post('/realestate/listings', listingToSend).then(function(response) {
        console.log('aha yes');
        swal("Well Done!", "property listing added!", "success");
        self.getListings();
      });

  }; //end addPlace


    self.deleteListing = function(id) {
      swal({
        title: "Are you sure??",
        text: "should we consign this property to the flames?",
        icon: "warning",
        buttons: ['No dog!', 'Burn it!'],
        dangerMode: true
      }).then(function (willDelete) {
        if (willDelete) {
          swal("Poof!", {icon: "success"});
          $http.delete('realestate/listings/' + id).then(function(response) {
            self.getListings();
            self.getValuesList();
          }).catch(function(error) {
            console.log('nuts');
          });
        } else {
          swal("Phew!");
        }
      });
    }; //end deleteRental

  self.editListing = function(id, property) {
    console.log('hi', property);
    var updatedListing = {};
    swal({
      title: "Update cost",
      text: "current cost: " + property.cost,
      content: "input"
    }).then(function(val) {
      console.log(val);
      updatedListing.cost = val;
      swal({
        title: "Update size",
        text: "current size: " + property.sqft,
        content: "input"
      }).then(function(val) {
        console.log(val);
        updatedListing.sqft = val;
        swal({
          title: "Update city",
          text: "current city: " + property.city,
          content: "input"
        }).then(function(val) {
          console.log(val);
          updatedListing.city = val;
          updatedListing.values = updatedListing.sqft/updatedListing.cost;
          // console.log(updatedListing);
          swal({
            title: "Save update??",
            text: "Cost: " + updatedListing.cost + ", Sqft: " + updatedListing.sqft + ", City: " + updatedListing.city,
            icon: "warning",
            buttons: ['Nope', 'Save'],
            dangerMode: true
          }).then(function(willUpdate) {
            console.log(updatedListing);
            if(willUpdate) {
              swal("Whoosh!", {icon: "success"});
              $http.put('realestate/listings/' + id, updatedListing).then(function(response) {
                swal("Well Done!", "property listing updated!", "success");
                self.getListings();
                self.getValuesList();
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
