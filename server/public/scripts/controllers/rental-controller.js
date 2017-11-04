
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    vm.result = RealEstateService.result;

    RealEstateService.getRentals();


});
