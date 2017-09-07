myApp.controller('HomeController', function($http, $location, $mdDialog, UserAuthService) {

    console.log('HomeController created');

    var vm = this;
    vm.userService = UserAuthService;
    vm.userObject = UserAuthService.userObject;
    vm.userUpdate = function (role) {
      if (UserAuthService.userObject.role == role) {
        return true;
      } else {
        return false;
      }
    };

    vm.service = UserAuthService;

    vm.service.getuser();

    vm.googleAuth = function () {
      console.log('authenticating user');
      // /auth/google
      $http.get('/auth/google').then(function(response) {
        console.log('called Google Auth route');
        vm.service.getuser();
        $location.path("/home");
      });
    };
    console.log('vm:', vm);

    //Main Landing Page Routes/Functions
    getEvents();

    // Get all upcoming events
    function getEvents(){
      console.log( 'in getEvents function' );
      //call to server to get tasks
      $http.get('/events').then(function(response){
        vm.eventObject = response.data;
        console.log('home.controller vmeventObject', vm.eventObject);
      }); // end success
    } // end getEvents



    vm.newsletterSignup = function(email) {
        console.log('adding to newsletter', email);
        // Create a dialogue prompt for adding a new idea.
        vm.showNewsletterPrompt = function(ev) {
           // Setup the properties for the prompt.
           var confirm = $mdDialog.prompt()
             .title('Add your information to stay up to date on Fix-It Tech Events')
             .placeholder('Email')
             .ariaLabel('Email')
             .targetEvent(ev)
             .ok('Add')
             .cancel('Cancel');

           // How to respond to the users input to the prompt.
           $mdDialog.show(confirm).then(function(result) {
             // This will run if the user clicks create.
             console.log('Adding Email to database:', result);
             // basic POST request to create a new topic.
             $http.post('/newsletter' + result, email).then(function(response){
               console.log('Got response Post:', response);
             });
           }, function() {
             // This will run if the user clicks cancel.
             console.log('Canceled adding email to newsletter');
           });
        };

        vm.showNewsletterPrompt();
      };

vm.volunteerRSVP = function(selectedEvent){
  console.log( 'in volunteerRSVP function' );
  console.log(selectedEvent);
  swal({
      title: 'Do you want to RSVP?',
      text: "RSVP to this event",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32CD32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am going!'
    }).then(function () {
  // call to server to get tasks
  console.log('going to run RSVP POST');
  $http.post('/rsvp', selectedEvent).then(function(response){
    vm.rsvpObject = response.data;
    console.log('home.controller vmeventObject', vm.rsvpObject);
});
});
};

var flkty = new Flickity( '.carousel', {
  // options
  cellAlign: 'left',
  contain: 'false',
  imagesLoaded: 'true',
  percentPosition: 'false',
  setGallerySize: 'true',
  resize: 'true',
  autoPlay: 'true',
  wrapAround: 'false'
});

});
