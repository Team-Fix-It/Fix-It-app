myApp.controller('EventController', function($location, $http, UserAuthService) {
  console.log('EventController loaded');
  var vm = this;
  vm.Service = UserAuthService;

  getEvents();

  vm.addEvent = function(newEvent){
    console.log('addEvent function clicked');
    //Here is the post request to send new event values to database
    console.log(newEvent);
    $http.post('/events/create', newEvent)
    .then(function(response){
      console.log('added event', response);
    });
  };

  //access from the view
  vm.editEvent = function(selectedEvent){
    console.log( 'in editEvents functon', selectedEvent);
    // ajax call to server to get tasks
    $http.put('/events/edit', vm.data).then(function(selectedEvent){
      editEvent();
    }); // end success
  }; // end editEvent

  vm.deleteThisEvent = function(selectedEvent){
    console.log( 'in deleteEvents function', selectedEvent);
    vm.data.selectedEvent = selectedEvent;
    // ajax call to server to get tasks
    $http.delete('/events/edit/' + selectedEvent.id).then(function(selectedEvent){
      getEvents();
    }); // end success
  };// end deleteThisEvent

  function getEvents(){
    console.log( 'in getEvents function' );
    // ajax call to server to get tasks
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getEvents

});
