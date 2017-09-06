var session = require('express-session');

module.exports = session({
   secret: process.env.DATABASE_SECRET || require('../.config.js').DATABASE_SECRET, //env var: SECRET
   key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
});
