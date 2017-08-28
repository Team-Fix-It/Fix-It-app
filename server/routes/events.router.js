var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;

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
          if(req.isAuthenticated()) {
            // We connected to the database!!!
            // Now we're going to GET things from the db
            var queryText = 'INSERT INTO "events" ("event_name", "event_location", "event_description", "starting", "ending")' +
            ' VALUES ($1, $2, $3, $4, $5);';
            // errorMakingQuery is a bool, result is an object
            db.query(queryText,[ev.event_name, ev.event_location, ev.event_description, ev.starting,
              ev.ending], function(errorMakingQuery, result){
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
            } else {
              res.sendStatus(401);
            }
          } // end if
        }); // end pool
      }); // end of POST - create event admin

module.exports = router;
