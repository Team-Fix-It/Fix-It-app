myApp.controller('VolunteersController', function($location, $http, UserAuthService){
  console.log('VolunteersController loaded.');
  var vm = this;

  vm.proficiencies = ['High','Medium','Low','None','Interested in Learning'];

  // Hard coded for now but should be the result of a query
  vm.skills = [{skillid: 1, name: 'Mac Computer', proficiency: 4},
               {skillid: 2, name: 'Windows Computer', proficiency: 4}];

getVolunteers();

  function getVolunteers(){
      console.log( 'in getVolunteers function' );
      // ajax call to server to get tasks
      $http.get('/volunteers').then(function(response){
        vm.volunteersObject = response.data;
        console.log('events.controller vmvolunteersObject', vm.volunteersObject);
      }); // end success
    } // end getEvents

    vm.addVolunteer = function (volunteer){
      console.log( 'in addVolunteer function' );
      // ajax call to server to get tasks
      $http.post('/volunteers/add', volunteer).then(function(response){
        console.log('volunteer.controller vm.volunteerObject');
      }); // end success
    };

    vm.volunteerProfileAdd = function (newVolunteer, skill){
      console.log( 'in volunteerProfileAdd' );
      console.log(skill);
      console.log(newVolunteer);
      $http.post('/volunteers/newVolunteer', newVolunteer).then(function(response){
        console.log('volunteer.controller vm.newVolunteer');
      });
      $http.post('/volunteers/skill', skill).then(function(response){
        console.log('volunteer.controller vm.skill');
      });

    };

});
