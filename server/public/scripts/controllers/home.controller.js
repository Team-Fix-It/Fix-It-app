myApp.controller('HomeController', function($http, $location, UserAuthService) {

    console.log('HomeController created');

    var vm = this;

    vm.service = UserAuthService;

    vm.service.getuser();

    vm.googleAuth = function () {
      console.log('authenticating user');
      // /auth/google
      $http.get('/auth/google').then(function(response) {
        console.log('called Google Auth route');
        vm.service.getuser();
        $location.path("/home");
      });
    };
    console.log('vm:', vm);
});
