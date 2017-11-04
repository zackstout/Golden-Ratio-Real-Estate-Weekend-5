
app.controller('MainController', function (RealEstateService) {
    console.log('main controller created.');

    var vm = this;
    vm.newPlace = {};

    vm.addPlace = function(place) {
      RealEstateService.addPlace(place);
    };

    // RealEstateService.getImage2();


});
