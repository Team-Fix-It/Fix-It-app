myApp.controller('CustomerController', function($location, $http, UserAuthService) {
  console.log('CustomerController loaded');
  var vm = this;
  vm.Service = UserAuthService;
});
