myApp.controller('EventCheckInController', function($location, $http, EventService, UserAuthService, $timeout, $q, $log) {
  console.log('EventCheckInController loaded');
  var vm = this;

  vm.event = 'Event Name';
  vm.Service = UserAuthService;
  vm.eventService = EventService;
  vm.isDisabled = false;
  vm.simulateQuery = false;
  vm.isDisabled = false;
  vm.allVolunteers = '';
  // vm.volunteers = loadAll();
  vm.verbose = false;

  // list of `state` value/display objects

  vm.querySearch   = querySearch;
  vm.selectedItemChange = selectedItemChange;
  vm.searchTextChange   = searchTextChange;
  vm.newVolunteer = newVolunteer;
  vm.volunteersObject = {};
  vm.attendanceObject = {};
  vm.addAttendance = addAttendance;
  vm.currentAttendance = {};

  getVolunteers();
  getCurrentAttendance();

  if (vm.verbose) {
    console.log('vm.allVolunteers:', vm.allVolunteers);
  }

  function getCurrentAttendance() {
    $http.get('/events/attendance/' + vm.eventService.currentEvent.id).then(function(response) {
      console.log('response on get attendance:', response);
      vm.currentAttendance = response.data;
    });
  }

  function newVolunteer(volunteer) {
    alert("Sorry!" + volunteer + " isn't currently in the database. You can add them now.");
  }

  // ******************************
  // Internal methods
  // ******************************

  /**
   * Search for volunteers... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch (query) {
    if (vm.verbose) {
      console.log('all volunteers in query:', vm.allVolunteers);
    }
    var results = query ? vm.volunteers.filter( createFilterFor(query) ) : vm.volunteers,
        deferred;
    if (vm.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }

  function searchTextChange(text) {
    if (vm.verbose) {
      $log.info('Text changed to ' + text);
    }
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
    vm.attendanceObject.volunteer = item;
    vm.attendanceObject.event = vm.eventService.currentEvent;
    if (vm.verbose) {
      console.log('vm.attendanceObject:', vm.attendanceObject);
    }

  }

  function addAttendance() {
    $http.post('/events/attendance', vm.attendanceObject).then( function(response) {
      if (vm.verbose) {
        console.log('Recieved a response from the attendance POST route:', response);
      }
      getCurrentAttendance();
    });
  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var volunteers = [];
    for (var i = 0; i < vm.volunteersObject.volunteers.length; i++) {
      var currentVolunteer = {};
      var name = vm.volunteersObject.volunteers[i].first_name + ' ' + vm.volunteersObject.volunteers[i].last_name;
      currentVolunteer.value = name.toLowerCase();
      currentVolunteer.display = name;
      currentVolunteer.email = vm.volunteersObject.volunteers[i].email;
      currentVolunteer.id = vm.volunteersObject.volunteers[i].id;
      volunteers.push(currentVolunteer);
    }
    if (vm.verbose) {
      console.log('volunteers:', volunteers);
    }
    return volunteers;
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(volunteer) {
      return (volunteer.value.indexOf(lowercaseQuery) >= 0);
      // return (volunteer.value.indexOf(lowercaseQuery) === 0);
    };
  }

  function getVolunteers(){
    // ajax call to server to get tasks
    $http.get('/volunteers').then(function(response){
      var allVolunteers = '';
      vm.volunteersObject = response.data;
      for (var i = 0; i < vm.volunteersObject.volunteers.length; i++) {
        if (i != (vm.volunteersObject.volunteers.length - 1)) {
          allVolunteers = allVolunteers + vm.volunteersObject.volunteers[i].first_name + ' ' + vm.volunteersObject.volunteers[i].last_name + ', ';
        } else if (i == (vm.volunteersObject.volunteers.length - 1)) {
          allVolunteers = allVolunteers + vm.volunteersObject.volunteers[i].first_name + ' ' + vm.volunteersObject.volunteers[i].last_name;
        }
      }
      if (vm.verbose) {
        console.log('all volunteers for autocomplete:', allVolunteers);
        console.log('events.controller vmvolunteersObject', vm.volunteersObject);
      }
      vm.allVolunteers = allVolunteers;
      vm.volunteers = loadAll();
    }); // end success
  } // end getEvents
});
