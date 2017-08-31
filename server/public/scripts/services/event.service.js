myApp.factory('EventService', function($http, $location){
  // console.log('EventService Loaded');

  var data = {selectedEvent: {event_name: 'test'}};
  
  //Empty object for storing the selected event to update attendance on
  var currentEvent = {};

  return {
    data : data,
    currentEvent :currentEvent

};
});
