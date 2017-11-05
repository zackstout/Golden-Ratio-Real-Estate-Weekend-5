
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    vm.result = RealEstateService.result;
    // vm.image = RealEstateService.image;
    vm.search = '';
    vm.sort = '';
    vm.sorttype = '';

    vm.orderDescending = function() {
      console.log('ordering', vm.sort, vm.sorttype);
      RealEstateService.getRentalsOrdered('desc', vm.sort);
    };

    vm.orderAscending = function() {
      console.log('ordering', vm.sort, vm.sorttype);
      RealEstateService.getRentalsOrdered('asc', vm.sort);
    };
    

    RealEstateService.getRentals();

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
