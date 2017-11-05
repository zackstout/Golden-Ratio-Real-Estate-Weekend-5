
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    vm.result = RealEstateService.result;
    // vm.image = RealEstateService.image;

    RealEstateService.getRentals();

    vm.editProperty = function() {
      console.log('edit');
    };

    vm.deleteProperty = function(id) {
      console.log('del', id);
      RealEstateService.deleteRental(id);
    };

    // RealEstateService.getImage2();


});
