
console.log('js');

var app = angular.module('app', ['ngRoute']);


app.config(function($routeProvider) {
  $routeProvider.when('/rentals', {
    templateUrl: 'templates/rentals.html',
    controller: 'RentalController as rc'
  }).when('/listings', {
    templateUrl: 'templates/listings.html',
    controller: 'ListingController as lc'
  }).when('/favorites', {
    templateUrl: 'templates/favorite.html',
    controller: 'FavoriteController as fc'
  });
});
