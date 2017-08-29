var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/auth/google', passport.authenticate('google', {scope : ['openid', 'email'], prompt: 'select_account'}));

router.get('/auth/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

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
