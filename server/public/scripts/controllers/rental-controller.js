
app.controller('RentalController', function (RealEstateService) {
    console.log('rental controller created.');

    var vm = this;
    vm.result = RealEstateService.result;
    vm.image = RealEstateService.image;

    RealEstateService.getRentals();

    // RealEstateService.getImage2();


});
