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

    //Main Landing Page Routes/Functions
    getEvents();

    // Get all upcoming events
    function getEvents(){
      console.log( 'in getEvents function' );
      // ajax call to server to get tasks
      $http.get('/events').then(function(response){
        vm.eventObject = response.data;
        console.log('home.controller vmeventObject', vm.eventObject);
      }); // end success
    } // end getEvents

    // Post email to email sign-up
    vm.addVolunteer = function (email){
      console.log( 'in addVolunteer function' );
      // ajax call to server to get tasks
      $http.post('/', email).then(function(response){
        console.log('home.controller vm.emailObject');
      }); // end success
    };


});
