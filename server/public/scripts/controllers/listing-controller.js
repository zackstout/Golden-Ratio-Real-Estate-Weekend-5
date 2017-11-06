
app.controller('ListingController', function (ListingService, RealEstateService) {
  console.log('list controller created.');

  var vm = this;
  vm.result = ListingService.result;

  ListingService.getListings();

  vm.best = ListingService.bestList;


  vm.getValueList = function() {
    console.log('gettin value list');
    ListingService.getValuesList();
  };

  vm.getValueList();
  //
  // //it's odd that calling this makes the first value NOT NaN..
  //     vm.getValue();

  vm.addFave = function(id, listing) {
    console.log('fav', id, listing);
    RealEstateService.addFave(id, listing);
  };


  vm.search = '';
  vm.sort = '';

  vm.searchListings = function() {
    console.log(vm.search);
    ListingService.searchListings(vm.search);
  };

  vm.orderDescending = function() {
    ListingService.getListingsOrdered('desc', vm.sort);
  };

  vm.orderAscending = function() {
    ListingService.getListingsOrdered('asc', vm.sort);
  };



  vm.editProperty = function(id, property) {
    console.log('editing', property);
    ListingService.editListing(id, property);
  };

  vm.deleteProperty = function(id) {
    console.log('del', id);
    ListingService.deleteListing(id);
  };

  // RealEstateService.getImage2();




});
