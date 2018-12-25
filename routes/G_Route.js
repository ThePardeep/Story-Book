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

Router.get("/verify",(req,res) => {
  if(req.user) {
    res.send(req.user)
  } else {
    res.send("Not Auth")
  }
});

//@Type : GET
//@Route : /auth/logout
//@Desc : User LOGOUT 
//@Access : PRIVATE

Router.get("/logout" , (req,res) => {
  req.logOut();
  res.redirect("/");
})
module.exports = Router;