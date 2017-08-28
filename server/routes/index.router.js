var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/#/home',
  failureRedirect: '/#/home'
}));

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
