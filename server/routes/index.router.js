var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');
var ADMIN = 1;
var USER = 2;

// Login Stuff
router.get('/auth/google', passport.authenticate('google', {scope : ['openid', 'email'], prompt: 'select_account'}));

router.get('/auth/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//Landing Page Stuff

//Post to add email to database to get the newsletter
//Post for the admin to add a new volunteer to the database
router.post('/newsletter', function(req, res){
  var newsletter = req.body;
  console.log('Post route called to', email);
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
        var queryText = 'INSERT INTO "email" ("first_name", "last_name", ' +
        '"email")' +
            ' VALUES ($1, $2, $3);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [newsletter.first_name, newsletter.last_name, newsletter.email], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            // console.log(result);
            // Send back the results
            var data = {newletter: result.rows};
            res.send(data);
          }
        }); // end query

      } // end else
    }); // end pool
  // } else {
  //   res.sendStatus(401);
  // }
}); // end of POST

//post route for volunteer will post rsvp
router.post('/rsvp', function(req, res){
  var rsvp = req.body;
  console.log('Post route called to', rsvp);
  console.log('req.user.id', req.user.id);
  if(req.isAuthenticated()&& req.user.role === USER) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', errorConnectingToDatabase);
        res.sendStatus(500);
      } else {
        var queryText = 'INSERT INTO "rsvp" ("event_id", "volunteer_id", "response") VALUES ($1, $2, $3)';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [rsvp.id, req.user.id, 'attending'], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query:', errorMakingQuery);
            // res.sendStatus(500);
          } else {
            console.log(result);
            // Send back the results
            var data = {rsvp: result.rows};
            res.send(data);
          }
        });
      } // end else
    }); // end pool
  } else {
    res.sendStatus(401);
  }
}); // end of POST

//Get route for volunteer rsvp'd events
/* Not currently being used*/
router.get('/rsvp/volunteer', function(req, res){
  var rsvp = req.body;
  console.log('Get route called to', rsvp);
  console.log('req.user.id', req.user.id);
  if(req.isAuthenticated()&& req.user.role === USER) {
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.', errorConnectingToDatabase);
        res.sendStatus(500);
      } else {
        var queryText = 'SELECT * FROM "rsvp" JOIN "events" ' +
        'ON "events"."id" = "rsvp"."event_id" JOIN "volunteers" ' +
        'ON "volunteers"."id" = "rsvp"."volunteer_id" WHERE "volunteers"."id" = $1;';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.user.id], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query:', errorMakingQuery);
            // res.sendStatus(500);
          } else {
            console.log(result);
            // Send back the results
            var data = {rsvp: result.rows};
            res.send(data);
          }
        });
      } // end else
    }); // end pool
  } else {
    res.sendStatus(401);
  }
}); // end of GET

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  console.log('request for index');
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/*', function(req, res) {
  console.log('404 : ', req.params);
  res.sendStatus(404);
});

module.exports = router;
