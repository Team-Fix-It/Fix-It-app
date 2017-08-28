var passport = require ('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var pool = require('../modules/pool.js');

passport.use(new GoogleStrategy({
    clientID:     "396924246406-bgm6bms48jd1r6eph6vr6j2ipt20v52r.apps.googleusercontent.com",
    clientSecret: "BYc0D8vtcrmRfbESq45McDPL",
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },function(req, accessToken, refreshToken, profile, done){
      console.log("THIS IS THE PROFILE", profile);
      console.log("THIS IS THE PROFILE ID", profile.id);
      console.log("THIS IS THE PROFILE NAME", profile.displayName);
      console.log("THIS IS THE PROFILE EMAIL", profile.emails[0].value);
      console.log("THIS IS THE PROFILE PIC", profile.photos[0].value );
      pool.connect(function (err, client, release) {
        if(err) {
          console.log('connection err ', err);
          release();
          done(err);
        }
        var user = {};
        client.query("INSERT INTO volunteers (first_name, last_name, email) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING",
        [profile.name.givenName, profile.name.familyName, profile.emails[0].value],
        function(err, result) {
        // Handle Errors
          if(err) {
            console.log('query err ', err);
            done(err);
            release();
          }
          client.query("SELECT * FROM volunteers WHERE email = $1",
          [profile.emails[0].value],
          function(err, result){
            if(err) {
              console.log('query err ', err);
              done(err);
              release();
            }
          user = result.rows[0];
          console.log("THIS IS THE USER: ", result);
          release();
          if(!user) {
              // user not found
              return done(null, false, {message: 'Incorrect credentials.'});
          } else {
            // user found
            console.log('User row ', user);
            done(null, user);
          }
        });
        });
      });
    } //end of function
)); //end of new GoogleStrategy

module.exports = passport;
