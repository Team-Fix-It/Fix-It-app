myApp.factory('UserAuthService', function($http, $location){
  console.log('UserAuthService Loaded');
  var userObject = {};

  return {
    // onSignIn: function(googleUser) {
    //   var profile = googleUser.getBasicProfile();
    //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    //   console.log('Name: ' + profile.getName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // },

    // signOut: function () {
    //   var auth2 = gapi.auth2.getAuthInstance();
    //   auth2.signOut().then(function () {
    //     console.log('User signed out.');
    //   });
    // },

    // logout : function() {
    //   console.log('UserService -- logout');
    //   $http.get('/user/logout').then(function(response) {
    //     console.log('UserService -- logout -- logged out');
    //     $location.path("/home");
    //   });
    // },

    userObject : userObject,

    getuser : function(){
      console.log('UserService -- getuser');
      console.log('userObject:', userObject);
      $http.get('/user').then(function(response) {
          if(response.data.email) {
              console.log('response:', response);
              // user has a curret session on the server
              userObject.email = response.data.email;
              userObject.role = response.data.role;
              userObject.firstName = response.data.first_name;
              userObject.lastName = response.data.last_name;
              userObject.phone = response.data.phone;
              userObject.organization = response.data.organization;
              userObject.heard_about = response.data.heard_about;
              userObject.follow_up = response.data.follow_up;
              userObject.why_volunteer = response.data.why_volunteer;
              userObject.previous_experience = response.data.previous_experience;
              userObject.id = response.data.id;
              $http.get('/volunteers/getskills/' + userObject.id).then(function(response) {
                console.log('response on get skills with id:', response);
                userObject.skills = response.data.skills;
                console.log('userObject:', userObject);
              });
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
              console.log('userObject:', userObject);
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        console.log('userObject:', userObject);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      userObject.email = undefined;
      userObject.role = undefined;
      console.log('userObject:', userObject);
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        console.log('userObject:', userObject);

        $location.path("/home");
      });
    }
  };
});
