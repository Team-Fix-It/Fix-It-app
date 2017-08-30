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
      $http.get('/user').then(function(response) {
          if(response.data.email) {
              // user has a curret session on the server
              userObject.email = response.data.email;
              console.log('UserService -- getuser -- User Data: ', userObject.email);
          } else {
              console.log('UserService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('UserService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('UserService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        $location.path("/home");
      });
    }
  };
});
