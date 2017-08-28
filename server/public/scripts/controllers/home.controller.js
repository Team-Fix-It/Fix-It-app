myApp.controller('HomeController', function($http, $location, UserAuthService) {
    console.log('HomeController created');
    var vm = this;
    vm.service = UserAuthService;
    console.log('vm:', vm);
});
