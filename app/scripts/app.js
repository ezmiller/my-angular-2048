'use strict';

/**
 * @ngdoc overview
 * @name twentyfourteightApp
 * @description
 * # twentyfourteightApp
 *
 * Main module of the application.
 */
angular
  .module('twentyfourteightApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
