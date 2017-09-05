myApp.controller('NavController', function(UserAuthService){
  console.log('NavController loaded.');
  var vm = this;
  vm.userService = UserAuthService;
  vm.userObject = UserAuthService.userObject;
});
