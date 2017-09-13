myApp.controller('CustomerController', function($location, $http, UserAuthService) {
  console.log('CustomerController loaded');
  var vm = this;
  vm.Service = UserAuthService;
});
//This is sourced in so that Fix-It can add customer facing features in the future.
