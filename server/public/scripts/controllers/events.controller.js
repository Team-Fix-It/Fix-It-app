myApp.controller('EventController', function(Service, $location, $http) {
  console.log('EventController loaded');
  var ec = this;
  ec.Service = Service;

  ec.addEvent = function(){
    console.log('addEvent function clicked');
    //Here is the post request to send new event values to database
    $http.post('/events', ec.newEvent)
    .then(function(response){
      console.log('added event', response);
    });

  };

});
