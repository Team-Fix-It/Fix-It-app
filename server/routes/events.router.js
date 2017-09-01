var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;


//Get for all events for that user to show up on the DOM
router.get('/', function(req, res){
  // if(req.isAuthenticated()) {
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      //method that passport puts on the req object returns T or F
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "events"';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          var data = {events: result.rows};
          res.send(data);
        }
      }); // end query

    } // end else
  }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of GET

// Create a new event
router.post('/create/', function(req, res){
  var ev = req.body;
  console.log('Post route called to event of', ev);
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.', req.body);
      res.sendStatus(500);
    } else {
      // if(req.isAuthenticated()) {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO "events" ("event_name", "event_location", "event_description", "starting_time", "ending_time", "event_date")' +
      ' VALUES ($1, $2, $3, $4, $5, $6);';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText,[ev.event_name, ev.event_location, ev.event_description, ev.starting_time,
        ev.ending_time, ev.event_date], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query', errorMakingQuery);
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {events: result.rows};
            res.send(data);
          }
        }); // end query
        // } else {
        //   res.sendStatus(401);
        // }
      } // end if
    }); // end pool
  }); // end of POST - create event admin

  router.put('/edit/', function(req, res){
    var details = req.body;
    console.log('Put route called to event of', details);
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', selectedEvent);
        res.sendStatus(500);
      } else {
        // if(req.isAuthenticated()) {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'UPDATE "events" SET "event_name"=$1, "event_location"=$2, "event_description"=$3, ' +
        '"starting_time"=$4, "ending_time"=$5, "event_date"=$6 WHERE "id"= $7' ;
        // errorMakingQuery is a bool, result is an object
        db.query(queryText,[details.event_name, details.event_location, details.event_description, details.starting_time,
          details.ending_time, details.event_date, details.id], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query', errorMakingQuery);
              res.sendStatus(500);
            } else {
              // console.log(result);
              // Send back the results
              var data = {events: result.rows};
              res.send(data);
            }
          }); // end query
          // } else {
          //   res.sendStatus(401);
          // }
        } // end if
      }); // end pool
    }); // end of PUT - edit event admin

    // delete route to delect selectedEvent -- Admin
    router.delete('/edit/:id', function(req, res){
      var selectedEvent = req.params.id;
      console.log('Delete route called to this id', selectedEvent);
      // errorConnecting is bool, db is what we query against,
      // done is a function that we call when we're done
      pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // We connected to the database!!!
          // Now we're going to GET things from the db
          var queryText = 'DELETE FROM "events" WHERE "id" = $1;' ;
          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [selectedEvent], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query');
              res.sendStatus(500);
            } else {
              // console.log(result);
              // Send back the results
              res.sendStatus(200);
            }
          }); // end query
        } // end if
      }); // end of DELETE - admin event delete
    });

    router.post('/attendance', function(req, res) {
      var attendanceObject = req.body;
      console.log('recieved object on attendance route:', attendanceObject);
      pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase) {
          console.log('Error connecting to the database.', req.body);
          res.sendStatus(500);
        } else {
          // if(req.isAuthenticated()) {
          // We connected to the database!!!
          // Now we're going to GET things from the db
          var queryText = 'INSERT INTO "attendance" ("volunteer_id", "event_id")' +
          ' VALUES ($1, $2);';
          // errorMakingQuery is a bool, result is an object
          db.query(queryText,[attendanceObject.volunteer.id, attendanceObject.event.id], function(errorMakingQuery, result){
              done();
              if(errorMakingQuery) {
                console.log('Attempted to query with', queryText);
                console.log('Error making query', errorMakingQuery);
                res.sendStatus(500);
              } else {
                // console.log(result);
                // Send back the results
                console.log('result from the db:', result);
                var data = {attendance: result.rows};
                res.send(data);
              }
            }); // end query
            // } else {
            //   res.sendStatus(401);
            // }
          } // end if
        }); // end pool
    });

    router.get('/attendance/:id', function(req, res) {
      var eventId = req.params.id;
      console.log('getting attendance:', eventId);
      pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          //method that passport puts on the req object returns T or F
          // Now we're going to GET things from the db
          // var queryText = 'SELECT * FROM "attendance" WHERE "event_id" = $1;';
          var queryText = 'SELECT "attendance"."id" as id, "volunteer_id",' +
                          '"event_id", "first_name", "last_name", "email" ' +
                          'FROM "attendance" JOIN "volunteers" ' +
                          'ON "attendance"."volunteer_id" = "volunteers"."id" ' + 
                          'WHERE "event_id" = $1;';
          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [eventId], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query:', errorMakingQuery);
              res.sendStatus(500);
            } else {
              // console.log(result);
              // Send back the results
              var data = {events: result.rows};
              res.send(data);
            }
          }); // end query

        } // end else
      }); // end pool
    });

    // delete route to delect selectedEvent -- Admin
    router.delete('/attendance/:id', function(req, res){
      var selectedEventAttendance = req.params.id;
      console.log('Delete route called to this id', selectedEventAttendance);
      // errorConnecting is bool, db is what we query against,
      // done is a function that we call when we're done
      pool.connect(function(errorConnectingToDatabase, db, done){
        if(errorConnectingToDatabase) {
          console.log('Error connecting to the database.');
          res.sendStatus(500);
        } else {
          // We connected to the database!!!
          // Now we're going to GET things from the db
          var queryText = 'DELETE FROM "attendance" WHERE "id" = $1;' ;
          // errorMakingQuery is a bool, result is an object
          db.query(queryText, [selectedEventAttendance], function(errorMakingQuery, result){
            done();
            if(errorMakingQuery) {
              console.log('Attempted to query with', queryText);
              console.log('Error making query');
              res.sendStatus(500);
            } else {
              // console.log(result);
              // Send back the results
              res.sendStatus(200);
            }
          }); // end query
        } // end if
      }); // end of DELETE - admin event delete
    });

    module.exports = router;
