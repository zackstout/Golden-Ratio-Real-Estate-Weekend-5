
app.controller('MainController', function (RealEstateService, $uibModal) {
    console.log('main controller created.');
    // $uibModal.open();

    var vm = this;
    vm.newPlace = {};

// if (vm.newPlace.type == 'rent') {
//   vm.newPlace.butt = 'haha';
// }

    vm.addPlace = function(place) {
      RealEstateService.addPlace(place);
    };
    //
    // vm.showModal = false;
    //
    // vm.openModal = function() {
    //   // var modal =
    //   // '<div id="add" ng-controller="MainController as mc"><form ng-submit="mc.addPlace(mc.newPlace)"><select ng-model="mc.newPlace.type"><option value="rent">For Rent</option><option value="sale">For Sale</option></select><input type="text" ng-model="mc.newPlace.size" placeholder="Size"><input type="text" ng-model="mc.newPlace.location" placeholder="City"><button type="submit">Do it!</button></form></div>';
    //
    //   console.log('ok');
    //   vm.showModal = true;
    //   $uibModal.open({
    //     templateUrl: "modal.html",
    //     controller: "ModalController"
    //   });
    // };
    // vm.cancel = function() {
    //   vm.showModal = false;
    // };

    // RealEstateService.getImage2();


});
