
app.controller('MainController', function (RealEstateService, ListingService) {
    console.log('main controller created.');

    var vm = this;
    //set the type value initially to avoid drop-down empty option shenanigans:
    vm.newPlace = {
      type: 'Rent'
    };

    vm.addPlace = function(place) {
      console.log('clicked', place);
      if (place.type == 'Rent') {
        RealEstateService.addRental(place);

      } else {
        ListingService.addListing(place);

      }
    };

//creating a sick logo:
    var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext("2d");

      var phi = 1.61803398875;
      ctx.strokeStyle = '#A4303F';

      function goldenRectangle(x) {
      //rectangle's border:
        ctx.moveTo(0,0);
        ctx.lineTo(x, 0);
        ctx.stroke();

        ctx.moveTo(0,0);
        ctx.lineTo(0, x/phi);
        ctx.stroke();

        ctx.moveTo(x,0);
        ctx.lineTo(x, x/phi);
        ctx.stroke();

        ctx.moveTo(0,x/phi);
        ctx.lineTo(x, x/phi);
        ctx.stroke();

    //first cuts:
        ctx.moveTo(x/phi,0);
        ctx.lineTo(x/phi, x/phi);
        ctx.stroke();

        ctx.moveTo(x/phi,x/Math.pow(phi, 2));
        ctx.lineTo(x, x/Math.pow(phi, 2));
        ctx.stroke();


    //cycle of 4:
        ctx.moveTo(x - x/Math.pow(phi, 3), x/Math.pow(phi, 2));
        ctx.lineTo(x - x/Math.pow(phi, 3), x/phi);
        ctx.stroke();

        ctx.moveTo(x - x/Math.pow(phi, 3), x/phi - x/Math.pow(phi, 4));
        ctx.lineTo(x/phi,x/phi - x/Math.pow(phi,4));
        ctx.stroke();

        ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/phi - x/Math.pow(phi, 4));
        ctx.lineTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2));
        ctx.stroke();

        ctx.moveTo(x/phi + x/Math.pow(phi, 5), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
        ctx.lineTo(x - x/Math.pow(3), x/Math.pow(phi, 2) + x/Math.pow(phi, 6));
        ctx.stroke();
      }

      goldenRectangle(200);

});
