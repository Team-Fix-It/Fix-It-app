var myApp = angular.module('myApp', ['ngRoute','ngMaterial','xeditable']);

 // Routes
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
  .when('/home', {
    templateUrl: '/views/templates/home.html',
    controller: 'HomeController as hc',
  })
  .when('/events/add', {
    templateUrl: '/views/templates/admin/newEvent.html',
    controller: 'EventController as ec',
  })
  .when('/volunteers', {
    templateUrl: '/views/templates/volunteer/volunteers.html',
    controller: 'VolunteersController as vc',
  })
  .when('/events', {
    templateUrl: '/views/templates/admin/eventList.html',
    controller: 'EventController as ec',
  })
    .otherwise({
      redirectTo: 'home'
    });
});
