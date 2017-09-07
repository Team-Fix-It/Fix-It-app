myApp.controller('EventController', function($location, $http, UserAuthService, EventService) {
  console.log('EventController loaded');
  var vm = this;
  vm.Service = UserAuthService;
  vm.data = EventService.data;
  vm.eventService = EventService;

  //retrieving the info in the events table when this controller is loaded
  getEvents();


              ///* CRUD operations *///

  //Create a new event to add to the Events table
  vm.addEvent = function(newEvent){
    console.log('addEvent function clicked', newEvent);
    $http.post('/events/create', newEvent)
    .then(function(response){
      addEventAlert();
      console.log('added event', response);
       }).catch(function(err){
        swal(
          'Oops...',
          'Something went wrong!',
          'error'
        );

    });
  };

  //Read all of the events in the Events table
  function getEvents(){
    console.log( 'in getEvents function' );
    $http.get('/events').then(function(response){
      vm.eventObject = response.data;
      console.log('events.controller vmeventObject', vm.eventObject);
    }); // end success
  } // end getEvents


  function ConvertTime(t){
     // Get your time (using a hard-coded year for parsing purposes)
     var time = new Date("0001-01-01 " + t);

     // Output your formatted version (using your DateTime)
     var formatted = time.getHours() + ':' + ('0' + time.getMinutes()).slice(-2);

     var timestamp = "1970-01-10 " + formatted + ":00";
     // Return your formatted time
     return timestamp;
  }

  //Update an event in the Events table
  vm.editEvent = function(selectedEvent){
    console.log( 'in editEvents functon', selectedEvent);
    //event convert working
    selectedEvent.event_date = new Date(selectedEvent.event_date);
    console.log('event_date changed to new Date:', selectedEvent.event_date);
    //start time
    selectedEvent.starting_time = ConvertTime(selectedEvent.starting_time);
    console.log(selectedEvent.starting_time);
    selectedEvent.starting_time = new Date(selectedEvent.starting_time);
    console.log('starting_time changed to timestamp:',selectedEvent.starting_time );
    //end time
    selectedEvent.ending_time = ConvertTime(selectedEvent.ending_time);
    selectedEvent.ending_time = new Date(selectedEvent.ending_time);
    console.log('ending_time changed to timestamp:', selectedEvent.ending_time);
    $http.put('/events/edit', selectedEvent).then(function(selectedEvent){
      editEventAlert();
      getEvents();

    }).catch(function(err){
     swal(
       'Oops...',
       'Something went wrong!',
       'error'
     );

 }); // end success
  }; // end editEvent

  //Delete an event from the Events table
  vm.deleteThisEvent = function(selectedEvent){
    console.log( 'in deleteEvents function', selectedEvent);
    vm.data.selectedEvent = selectedEvent;
    swal({
    title: 'Are you sure?',
    text: "This will delete this event and data associated with it.",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#32CD32',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function () {
    $http.delete('/events/edit/' + selectedEvent.id).then(function(selectedEvent){
      getEvents();
    });
    swal(
        'Deleted!',
        'Your event has been deleted.',
        'success'
      );
  }).catch(function(err){
   swal(
     'Oops...',
     'Something went wrong!',
     'error'
   );

});
  };// end deleteThisEvent


  //passing the selectedEvent into the variable called currentEvent which is located in the EventService.
  vm.storeThisEvent = function(selectedEvent){
    console.log('in storeThisEvent function', selectedEvent);
    vm.eventService.currentEvent = selectedEvent;
    $location.url('/events/checkIn');
  };

// SweetAlert2 Functions
function addEventAlert() {
  swal({
    title: "Success!",
    text: "This event has been added",
    confirmButtonText: "View All Events",
    type: "success"
  }).then(function() {
    window.location.href = "#/events";
  });
}

function editEventAlert() {
    swal({
      title: "Success!",
      text: "This event has been updated",
      confirmButtonText: "View Events",
      type: "success"
    });
  }

});
