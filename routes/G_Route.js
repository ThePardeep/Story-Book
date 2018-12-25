const express = require("express");
const Router = express.Router();
const passport = require("passport");

//@Type : GET
//@Route : /auth/google
//@Desc : User Login With Google
//@Access : PUBLIC

Router.get('/google',
passport.authenticate('google', { scope: ['profile','email'] }));


//@Type : GET
//@Route : /google/callback
//@Desc : GOOGLE CALLBACK FUNCTION
//@Access : PRIVATE

Router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/dashboard');
});


module.exports = Router;