myApp.factory('EventService', function($http, $location){
  // console.log('EventService Loaded');

  var data = {selectedEvent: {event_name: 'test'}};

  return {
    data : data,


};
});
