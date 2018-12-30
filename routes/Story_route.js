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

  const NewStory = {
    title: req.body.title,
    body: req.body.content,
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
    .populate("user")
    .populate("comment.CommentUser")
    .then((Story) => {
      res.locals.meta = {
        title: Story.title
      };
      res.render("Story/read", {
        Story: Story
      });
    })
    .catch((err) => console.log(err));
});

//@Type : DELETE
//@Route : /story/delete
//@Desc : Delete Story
//@Access : PRIVATE

Router.get("/delete/:id", ensureAuthenticated, (req, res) => {
  StorySchema.findById(req.params.id)
    .then((story) => {
      const StoryUser = story.user;
      if (req.user.id == StoryUser) {
        StorySchema.findByIdAndDelete(req.params.id)
          .then((story) => {
            res.redirect("/user/profile");
          })
          .catch((err) => console.log(err));
      } else {
        req.flash("notAuth_msg", "Not Authorized");
        res.redirect("/user/profile");
      }
    })
    .catch((err) => console.log(err));
});

//@Type : GET
//@Route : /story/edit/:id
//@Desc : Edit Story
//@Access : PRIVATE

Router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  StorySchema.findById(req.params.id)
    .then((story) => {
      const StoryUser = story.user;
      if (req.user.id == StoryUser) {
        res.locals.meta = {
          title: "Edit " + story.title
        };
        res.render("Story/edit", {
          Story: story
        });
      } else {
        req.flash("notAuth_msg", "Not Authorized");
        res.redirect("/user/profile");
      }
    })
    .catch((err) => console.log(err));
});

//@Type : POST
//@Route : /story/edit/:id
//@Desc : Process Edit Story Data
//@Access : PRIVATE

Router.post("/edit/:id", ensureAuthenticated, (req, res) => {
  let AllowComment, Body;
  if (req.body.allow_cmt) {
    AllowComment = true;
  } else {
    AllowComment = false;
  }

  const UpdateStory = {
    title: req.body.title,
    body: req.body.content,
    allowcomment: AllowComment,
    status: req.body.status,
    user: req.user.id
  };
  StorySchema.findByIdAndUpdate(req.params.id, UpdateStory)
    .then((Story) => {
      res.redirect("/stories");
    })
    .catch((err) => {
      console.log(err);
    });
});

//@Type : POST
//@Route : /story/comment/:id
//@Desc : Process New Comments
//@Access : PRIVATE

Router.post("/add/comment/:id", ensureAuthenticated, (req, res) => {
  StorySchema.findById(req.params.id)
    .then((story) => {
      const CommentSchema = {
        CommentBody: req.body.comment,
        CommentUser: req.user.id
      };
      story.comment.unshift(CommentSchema);
      story
        .save()
        .then((story) => {
          res.redirect(`/story/show/${req.params.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;
