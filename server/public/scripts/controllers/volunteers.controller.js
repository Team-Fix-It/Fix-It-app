myApp.controller('VolunteersController', function($location, $http, UserAuthService, $mdDialog){
  console.log('VolunteersController loaded.');
  var vm = this;

  vm.proficiencies = ['High','Medium','Low','None','Interested in Learning'];
  vm.skillsObject = {};
  vm.skillProfile = {};
  vm.userAuthService = UserAuthService;
  vm.userObject = UserAuthService.userObject;

  getVolunteers();
  getSkills();

  function getVolunteers(){
      console.log( 'in getVolunteers function' );
      // ajax call to server to get tasks
      $http.get('/volunteers').then(function(response){
        vm.volunteersObject = response.data;
        console.log('volunteers.controller vmvolunteersObject', vm.volunteersObject);
      }).catch(function(err){
       swal(
         'Oops...',
         'Something went wrong!',
         'error'
       );
     });
    } // end getVolunteers

    //Edit a Volunteer in the Volunteers table
    vm.editVolunteer = function(people){
      console.log( 'in editVolunteer functon', people);
      $http.put('/volunteers/edit', people).then(function(people){
        editVolunteerAlert();
        getVolunteers();
      }).catch(function(err){
       swal(
         'Oops...',
         'Something went wrong!',
         'error'
       );
     });
    }; // end editVolunteer

    vm.goBack = function(){
      $location.path('/volunteers');
    };

//Getting the skills of a volunteer for admin to view
    vm.volunteerProfileSkills = function(id){
      $location.path('/viewSkill');
      $http.get('/volunteers/getSkills/' + id).then(function(response){
        vm.skillProfileObject = response.data;
        console.log('volunteers.controller vmskillProfileObject', vm.skillProfileObject);
      }).catch(function(err){
      });
    };
    // vm.addVolunteer = function (volunteer){
    //   console.log( 'in addVolunteer function' );
    //   // ajax call to server to get tasks
    //   $http.post('/volunteers/add', volunteer).then(function(response){
    //     console.log('volunteer.controller vm.volunteerObject');
    //   }); // end success
    // };

    vm.volunteerProfileAdd = function (newVolunteer, proficiency){
      console.log( 'in volunteerProfileAdd' );
      console.log(proficiency);
      console.log(newVolunteer);
      $http.post('/volunteers/newVolunteer', newVolunteer).then(function(response){
        console.log('response:', response);
        var newSkillProfile = {};
        newSkillProfile.proficiency = proficiency;
        newSkillProfile.volunteerId = response.data.newVolunteer[0].id;
        console.log('here is the new skill profile:', newSkillProfile);
        $http.post('/volunteers/skill', newSkillProfile).then(function(response){
          volunteerProfileAlert();
          console.log('volunteer.controller vm.skill');
        }).catch(function(err){
         swal(
           'Oops...',
           'Something went wrong!',
           'error'
         );
       });
      });
    };

    function getSkills(){
        console.log( 'in getVolunteers function' );
        // ajax call to server to get tasks
        $http.get('/volunteers/getSkills').then(function(response){
          vm.skillsObject = response.data;
          for (var i = 0; i < vm.skillsObject.skills.length; i++) {
            vm.skillsObject.skills[i].proficiency = '4';
          }
          console.log('skills object:', vm.skillsObject);
        }).catch(function(err){
         swal(
           'Oops...',
           'Something went wrong!',
           'error'
         );
       }); // end success
      } // end getEvents

// SweetAlert2 Functions
// admin view ? we currently only have one function
function addVolunteerAlert() {
  swal({
    title: "Success!",
    text: "This volunteer has been added",
    confirmButtonText: "View All Volunteers",
    type: "success"
  }).then(function() {
    window.location.href = "#/volunteers";
  });
}

// for voluteer view
function volunteerProfileAlert() {
  swal({
    title: "Success!",
    text: "Your profile has been added",
    confirmButtonText: "View Upcoming Events",
    type: "success"
  }).then(function() {
    window.location.href = "#/home";
  });
}

function editVolunteerAlert() {
    swal({
      title: "Success!",
      text: "This volunteer profile has been updated",
      confirmButtonText: "View profile",
      type: "success"
    });
  }

});
