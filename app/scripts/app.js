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
.module('twentyfourtyeightApp', [])
.controller('GameController', function(GameManager) {
  this.game = GameManager;
});