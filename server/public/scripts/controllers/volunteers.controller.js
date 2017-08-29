myApp.controller('VolunteersController', function($location, $http, UserAuthService){
  console.log('VolunteersController loaded.');
  var vm = this;

getVolunteers();

  function getVolunteers(){
      console.log( 'in getVolunteers function' );
      // ajax call to server to get tasks
      $http.get('/volunteers').then(function(response){
        vm.volunteersObject = response.data;
        console.log('events.controller vmvolunteersObject', vm.volunteersObject);
      }); // end success
    } // end getEvents

});
