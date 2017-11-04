
app.controller('ListingController', function (RealEstateService) {
    console.log('list controller created.');

    var vm = this;
    vm.result = RealEstateService.result;

    RealEstateService.getListings();


});
