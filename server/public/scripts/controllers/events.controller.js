myApp.controller('EventController', function($location, $http, UserAuthService) {
  console.log('EventController loaded');
  var vm = this;
  vm.Service = UserAuthService;

  vm.addEvent = function(newEvent){
    console.log('addEvent function clicked');
    //Here is the post request to send new event values to database
    console.log(newEvent);
    $http.post('/events/create', newEvent)
    .then(function(response){
      console.log('added event', response);
    });

  };

});
