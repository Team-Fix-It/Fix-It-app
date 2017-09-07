var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      email : req.user.email,
      first_name : req.user.first_name,
      last_name : req.user.last_name,
      role: req.user.role
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  console.log('req.user before logout:', req.user);
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.session.destroy(function (err) {
    // res.redirect('/'); //Inside a callback… bulletproof!
    console.log('req.user after logout:', req.user);
    res.sendStatus(200);
  });
  // req.logOut();


});


module.exports = router;
