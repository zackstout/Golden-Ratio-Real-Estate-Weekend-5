
app.controller('MainController', function (RealEstateService) {
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
    // vm.openModal = function() {
    //
    //   console.log('ok');
    //   // swal('new property:', {
    //   //   content: "input"
    //   // }, "cost:", {
    //   //   content: "input"
    //   // }).then(function(value) {
    //   //   console.log(value);
    //   // });
    //
    //   swal({
    //     title: 'Add property',
    //     text: 'ok like this',
    //     content: "input"
    //   }).then(function (value) {
    //     console.log(value);
    //     swal({
    //       title: "cost?",
    //       content: "input"
    //     }).then(function (value) {
    //       console.log(value);
    //       swal({
    //         title: "sqft?",
    //         content: "input"
    //       });
    //     });
    //   }).catch(swal.noop);
    //
    //
    // };



    // RealEstateService.getImage2();


});
