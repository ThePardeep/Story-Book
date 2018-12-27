const Express = require("express");
const Router = Express.Router();
const StorySchema = require("../model/Story");
const { ensureAuthenticated } = require("../config/LoginStatus");

//Import Handlebar Helper

const { RemoveHtml } = require("../config/hdb");

//@Type : GET
//@Route : /story/add
//@Desc : Add Story Page
//@Access : PRIVATE

Router.get("/add", ensureAuthenticated, (req, res) => {
  res.locals.meta = {
    title: "Add Story"
  };
  res.render("Story/add");
});

//@Type : POST
//@Route : /story/add
//@Desc : Process New Story
//@Access : PRIVATE

Router.post("/add", ensureAuthenticated, (req, res) => {
  let AllowComment, Body;
  if (req.body.allow_cmt) {
    AllowComment = true;
  } else {
    AllowComment = false;
  }
  Body = RemoveHtml(req.body.content);

  const NewStory = {
    title: req.body.title,
    body: Body,
    allowcomment: AllowComment,
    status: req.body.status,
    user: req.user.id
  };
  new StorySchema(NewStory)
    .save()
    .then((Story) => {
      res.redirect("/stories");
    })
    .catch((err) => {
      console.log(err);
    });
});

//@Type : GET
//@Route : /story/show
//@Desc : Read Full Story
//@Access : PUBLIC

Router.get("/show/:id", (req, res) => {
  StorySchema.findById(req.params.id)
    .populate('user')
    .then((Story) => {
      res.render("Story/read", Story);
    })
    .catch((err) => console.log(err));
});

module.exports = Router;
