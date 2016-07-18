'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'myApp.version',
]);
myApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);
