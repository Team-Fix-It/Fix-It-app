var myApp = angular.module('myApp', ['ngRoute','ngSanitize', 'ngCsv','ngMaterial','xeditable', 'md.data.table','bc.Flickity']);


myApp.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('white', {
    '50': 'ffffff',
    '100': 'ffffff',
    '200': 'ffffff',
    '300': 'ffffff',
    '400': 'ffffff',
    '500': 'ffffff',
    '600': 'ffffff',
    '700': 'ffffff',
    '800': 'ffffff',
    '900': '37474f',
    'A100': 'ffffff',
    'A200': '37474f',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'light',

    'contrastDarkColors': ['50', '100',
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined
  });
  $mdThemingProvider.definePalette('darkTeal', {
    '50': '056571',
    '100': '056571',
    '200': '056571',
    '300': '056571',
    '400': '056571',
    '500': '056571',
    '600': '056571',
    '700': '056571',
    '800': '056571',
    '900': '056571',
    'A100': '056571',
    'A200': '056571',
    'A400': '056571',
    'A700': '056571',
    'contrastDefaultColor': 'light',

    'contrastDarkColors': ['50', '100',
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined
  });
  $mdThemingProvider.theme('default')
    //.backgroundPalette('white')
    .primaryPalette('indigo')
    .backgroundPalette('white')
    .accentPalette('indigo')
    .warnPalette('red');
});

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
  .when('/events/checkIn', {
    templateUrl: '/views/templates/admin/eventCheckIn.html',
    controller: 'EventCheckInController as ecic',
  })
  .when('/volunteers', {
    templateUrl: '/views/templates/admin/volunteers.html',
    controller: 'VolunteersController as vc',
  })
  .when('/customers', {
    templateUrl: '/views/templates/customer/customerRSVP.html',
    controller: 'CustomerController as cc',
  })
  .when('/events', {
    templateUrl: '/views/templates/admin/eventList.html',
    controller: 'EventController as ec',
})
  .when('/volunteerProfile', {
    templateUrl: '/views/templates/volunteer/volunteerProfile.html',
    controller: 'VolunteersController as vc',
  })
  .when('/volunteers/add', {
    templateUrl: '/views/templates/admin/addVolunteers.html',
    controller: 'VolunteersController as vc',
  })
  .when('/events/rsvp', {
    templateUrl: '/views/templates/admin/eventRSVP.html',
  })
  .when('/about', {
    templateUrl: '/views/templates/Footer/about.html',
  })
  .when('/resources', {
    templateUrl: '/views/templates/Footer/resources.html',
  })
  .when('/sponsors', {
    templateUrl: '/views/templates/Footer/sponsors.html',
  })
  .when('/skills', {
    templateUrl: '/views/templates/admin/volunteerSkills.html',
    controller: 'SkillsController as sc',
  })
  .when('/viewSkill', {
    templateUrl: '/views/templates/admin/skillProfile.html',
    controller: 'VolunteersController as vc',
  })
    .otherwise({
      redirectTo: 'home'
    });
});
