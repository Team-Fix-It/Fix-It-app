var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;

// POST a new skill - this route is functional but not linked in
//the nav for the admin
router.post('/add', function(req, res){
  if(req.isAuthenticated()&& req.user.role === ADMIN) {
  var as = req.body;
  console.log('Post route called to', as);
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', errorConnectingToDatabase);
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO "skills" ("skill") VALUES ($1);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [as.skill], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {skills: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  } else {
    res.sendStatus(401);
  }
}); // end of POST

// Get all skills
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
        var queryText = 'SELECT * FROM "skills"';
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
            var data = {skills: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of GET

// Update a skill


// Delete a skill



module.exports = router;
