const Express = require("express");
const Router = Express.Router();
const StorySchema = require("../model/Story");
const UserSchema = require("../model/User");
const { ensureAuthenticated } = require("../config/LoginStatus");

//Import Handlebar Helper

const { RemoveHtml } = require("../config/hdb");

//@Type : GET
//@Route : /user/profile
//@Desc : Show User Profile
//@Access : PRIVATE

Router.get("/profile", ensureAuthenticated, (req, res) => {
  StorySchema.find({ user: req.user.id })
    .then((stories) => {
      res.locals.meta = {
        title: req.user.name
      };
      res.render("user/profile", {
        stories: stories
      });
    })
    .catch((err) => console.log(err));
});

module.exports = Router;
