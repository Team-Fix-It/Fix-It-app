myApp.controller('EventCheckInController', function($location, $http, UserAuthService, $timeout, $q, $log) {
  console.log('EventCheckInController loaded');
  var vm = this;

  vm.event = 'Event Name';
  vm.Service = UserAuthService;
  vm.isDisabled = false;
  vm.simulateQuery = false;
  vm.isDisabled = false;
  vm.allVolunteers = '';
  vm.volunteers = loadAll();
  vm.verbose = false;

  // list of `state` value/display objects

  vm.querySearch   = querySearch;
  vm.selectedItemChange = selectedItemChange;
  vm.searchTextChange   = searchTextChange;
  vm.newVolunteer = newVolunteer;
  vm.volunteersObject = {};

  getVolunteers();

  console.log('vm.allVolunteers:', vm.allVolunteers);

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
  }

  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    return vm.allVolunteers.split(/, +/g).map( function (volunteer) {
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
      return (volunteer.value.indexOf(lowercaseQuery) >= 0);
      // return (volunteer.value.indexOf(lowercaseQuery) === 0);
    };
  }

  function getVolunteers(){
    console.log( 'in getVolunteers function' );
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
      console.log('all volunteers for autocomplete:', allVolunteers);
      console.log('events.controller vmvolunteersObject', vm.volunteersObject);
      vm.allVolunteers = allVolunteers;
      vm.volunteers = loadAll();
    }); // end success
  } // end getEvents
});
