
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    vm.result = RealEstateService.result;

    vm.getRentals = function() {
      RealEstateService.getRentals();

    };

    vm.getRentals();

  
    vm.search = '';
    vm.sort = '';

    vm.searchRentals = function() {
      console.log(vm.search);
      RealEstateService.searchRentals(vm.search);
    };

    vm.orderDescending = function() {
      RealEstateService.getRentalsOrdered('desc', vm.sort);
    };

    vm.orderAscending = function() {
      RealEstateService.getRentalsOrdered('asc', vm.sort);
    };



    vm.editProperty = function(id, property) {
      console.log('editing', property);
      RealEstateService.editRental(id, property);
    };

    vm.deleteProperty = function(id) {
      console.log('del', id);
      RealEstateService.deleteRental(id);
    };

    // RealEstateService.getImage2();


});
