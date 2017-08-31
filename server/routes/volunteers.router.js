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
        var queryText = 'SELECT * FROM "volunteers"';
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
            var data = {volunteers: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of GET

//Post for the admin to add a new volunteer to the database
router.post('/add', function(req, res){
  var av = req.body;
  console.log('Post route called to', av);
  // if(req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', req.body);
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO "volunteers" ("first_name", "last_name", ' +
        '"email", "phone", "organization", "role", "status")' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [av.first_name, av.last_name, av.email, av.phone, av.organization, av.role, av.status], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {volunteer: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of POST

//Post for the admin to add a new volunteer to the database
router.put('/edit', function(req, res){
  var av = req.body;
  console.log('Post route called to', av);
  // if(req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', req.body);
        res.sendStatus(500);
      } else {
        //method that passport puts on the req object returns T or F
        // Now we're going to GET things from the db
        var queryText = 'UPDATE "volunteers" ("first_name", "last_name", ' +
        '"email", "phone", "organization", "role", "status")' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [av.first_name, av.last_name, av.email, av.phone, av.organization, av.role, av.status], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {volunteer: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of POST

module.exports = router;
