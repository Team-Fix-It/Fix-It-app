myApp.controller('SkillsController', function($location, $http, UserAuthService){
  console.log('SkillsController loaded.');
  var vm = this;

getSkills();

// Get all skills
function getSkills(){
  console.log( 'in getSkills function' );
  // ajax call to server to get tasks
  $http.get('/skills').then(function(response){
    vm.skillsObject = response.data;
    console.log('events.controller vmskillsObject', vm.skillsObject);
  }); // end success
} // end getSkills

// Post a new skill
vm.addSkill = function(skill){
  console.log( 'in addSkill function' );
  console.log( 'skill:', skill );
  var newSkill = {skill: skill};
  // ajax call to server to get tasks
  $http.post('/skills/add', newSkill).then(function(response){
    console.log('added skill', response);
});
};

// // Update a skill
// vm.editThisSkill = function(skill){
//
// };
//
// // Delete a skill
// vm.deleteThisSkill = function (skill){
//
// };


});
