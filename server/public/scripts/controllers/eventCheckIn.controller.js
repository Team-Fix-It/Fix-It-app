myApp.controller('EventCheckInController', function($location, $http, UserAuthService, $timeout, $q, $log) {
  console.log('EventCheckInController loaded');
  var vm = this;

  vm.event = 'Event Name';
  vm.Service = UserAuthService;
  vm.volunteers = ['Alec', 'Anne', 'Emily', 'Ben'];
  vm.isDisabled = false;
  vm.simulateQuery = false;
  vm.isDisabled = false;

  // list of `state` value/display objects
  vm.volunteers = loadAll();
  vm.querySearch   = querySearch;
  vm.selectedItemChange = selectedItemChange;
  vm.searchTextChange   = searchTextChange;
  vm.newVolunteer = newVolunteer;
  vm.volunteersObject = {};

  getVolunteers();

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
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allVolunteers = 'Alec, Anne, Emily, Ben';

    return allVolunteers.split(/, +/g).map( function (volunteer) {
      return {
        value: volunteer.toLowerCase(),
        display: volunteer
      };
    });
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(volunteer) {
      return (volunteer.value.indexOf(lowercaseQuery) === 0);
    };
  }

  function getVolunteers(){
    console.log( 'in getVolunteers function' );
    // ajax call to server to get tasks
    $http.get('/volunteers').then(function(response){
      vm.volunteersObject = response.data;
      console.log('events.controller vmvolunteersObject', vm.volunteersObject);
    }); // end success
  } // end getEvents
});
