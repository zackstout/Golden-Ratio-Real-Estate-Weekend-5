
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    // vm.result = RealEstateService.result;
    //wait this should not have worked.....wait maybe we just weren't using it:
    // vm.best = RealEstateService.best;

    //promises -- wait, no, this is databinding:
    // vm.rentals = RealEstateService.rentals;
    // vm.best = RealEstateService.best;

//snapshot in time when controller loads:
    vm.rentals = RealEstateService.rentals;
    vm.best = RealEstateService.best;

    vm.getRentals = function() {
      RealEstateService.getRentals().then(function(res) {
        vm.rentals = res;
      });

    };

    if (RealEstateService.rentals.length === 0) {
      vm.getRentals();

    }

    //
    // vm.addFave = function(id, rental) {
    //   console.log('fav rental', rental);
    //   RealEstateService.addFaveRental(id, rental);
    // };


    vm.getValue = function() {
      console.log('gettin value');
      RealEstateService.getValues().then(function(res) {
        vm.best = res;
      });
    };


    if (RealEstateService.best.length === 0) {
      vm.getValue();

    }
//
// //it's odd that calling this makes the first value NOT NaN..
//     vm.getValue();


    vm.search = '';
    vm.sort = '';

    vm.searchRentals = function() {
      console.log(vm.search);
      RealEstateService.searchRentals(vm.search).then(function(res) {
        vm.rentals = res;
      });
    };

    vm.orderDescending = function() {
      RealEstateService.getRentalsOrdered('desc', vm.sort).then(function(res) {
        vm.rentals = res;
      });
    };

    vm.orderAscending = function() {
      RealEstateService.getRentalsOrdered('asc', vm.sort).then(function(res) {
        vm.rentals = res;
      });
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
