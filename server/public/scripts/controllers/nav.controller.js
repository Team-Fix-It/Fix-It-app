myApp.controller('NavController', function(UserAuthService){
  console.log('NavController loaded.');
  var vm = this;
  vm.userService = UserAuthService;
  vm.userObject = UserAuthService.userObject;
  vm.userUpdate = function (role) {
    if (UserAuthService.userObject.role == role) {
      return true;
    } else {
      return false;
    }
  };

});
