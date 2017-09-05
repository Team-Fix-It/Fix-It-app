var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;

//Get for all events for that user to show up on the DOM
router.get('/', function(req, res){
  if(req.isAuthenticated() && ((req.user.role === USER) || (req.user.role === ADMIN))) {
    console.log('authentication succeeded');
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
  } else {
    console.log('authentication failed');
    res.sendStatus(401);
  }
}); // end of GET

router.get('/getSkills', function(req, res){
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

//Post for the admin to add a new volunteer to the database
router.post('/add', function(req, res){
  var av = req.body;
  console.log('Post route called to', av);
  if(req.isAuthenticated()) {
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
         '"phone", "organization", "role", "status")' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [av.first_name, av.last_name, av.phone, av.organization, av.role, av.status], function(errorMakingQuery, result){
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
  } else {
    res.sendStatus(401);
  }
}); // end of POST


//Post for the admin to add a new volunteer to the database

//post route for volunteer to add their own profile
router.post('/newVolunteer', function(req, res){
  var newVolunteer = req.body;
  console.log('Post route called to', newVolunteer);
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
        '"email", "phone", "organization", "role", "status", "heard_about", "follow_up", "why_volunteer", "previous_experience")' +
            ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newVolunteer.first_name, newVolunteer.last_name, newVolunteer.email, newVolunteer.phone, newVolunteer.organization, newVolunteer.role, newVolunteer.status, newVolunteer.heard_about, newVolunteer.follow_up, newVolunteer.why_volunteer, newVolunteer.previous_experience], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query:', errorMakingQuery);
            res.sendStatus(500);
          } else {
            console.log('result:', result);
            // console.log(result);
            // Send back the results

            var data = {newVolunteer: result.rows};

            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of POST

//post route for volunteer to add their skill levels
router.post('/skill', function(req, res){
  var skill = req.body;
  console.log('Post route called to', skill);
  // if(req.isAuthenticated()) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', req.body);
        res.sendStatus(500);
      } else {
        for (var i = 0; i < skill.proficiency.length; i++) {
        //method that passport puts on the req object returns T or F
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO "skillsprofile" ("skill_id", "volunteer_id", "proficiency_id") VALUES ($1, $2, $3);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [skill.proficiency[i].id, skill.volunteerId, skill.proficiency[i].proficiency], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query:', errorMakingQuery);
            // res.sendStatus(500);
          } else {
            console.log(result);
            // Send back the results
            // var data = {skill: result.rows};
            // res.send(data);
          }
        });
        } // end query
          res.sendStatus(200);

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of POST

module.exports = router;
