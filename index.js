const express = require("express");
const passport = require("passport");
const Exp_Session = require("express-session");
const BodyParser = require("body-parser");
const path = require("path");
const Mongoose = require("mongoose");
const CookieParser = require("cookie-parser");
const Handlebars = require("express-handlebars");

//Import Handlebar Helper

const { DesLength, RemoveHtml, DateFormat } = require("./config/hdb");

//Import Key File

const Keys = require("./config/keys");

//Init APP

const app = express();

//User Schema File

const UserSchema = require("./model/User");

//Story Schema Model

const StorySchema = require("./model/Story");

//Connect Mongoose
Mongoose.globle = process.globle;
Mongoose.connect(
  Keys.MongooseURL,
  {
    useNewUrlParser: true
  }
)
  .then(() => {
    console.log("MongoDb Succesfully Connected");
  })
  .catch((err) => console.log(err));

//Express Session Middleware

app.use(
  Exp_Session({
    secret: Keys.Secret,
    resave: false,
    saveUninitialized: true
  })
);

//Static Folder
app.use(express.static(path.join(__dirname, "./public")));

//Handlebars MiddleWare

app.engine(
  "handlebars",
  Handlebars({
    helpers: {
      DesLength: DesLength,
      RemoveHtml: RemoveHtml,
      DateFormat: DateFormat
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Body Parser MiddleWare
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

//Cookie Parser Middleware
app.use(CookieParser());

//Passport MiddleWares
app.use(passport.initialize());
app.use(passport.session());

//IMPORT Google Strategy File

require("./Stratergies/google_auth")(passport);

//Local Variables

app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  // res.locals.meta_tags =
  next();
});

//@Type : GET
//@Route : /
//@Desc : Home Route
//@Access : PUBLIC

app.get("/", (req, res) => {
  if (req.user) {
    //res.redirect("/stories");
    res.locals.meta = {
      title: "Ck Book"
    };
    res.render("index");
  } else {
    res.locals.meta = {
      title: "Ck Book"
    };
    res.render("index");
  }
});

//@Type : GET
//@Route : /about
//@Desc : About Route
//@Access : PUBLIC

app.get("/about", (req, res) => {
  res.locals.meta = {
    title: "About Us"
  };
  res.render("about");
});

//@Type : GET
//@Route : /stories
//@Desc : Show Public Stories
//@Access : PUBLIC

app.get("/stories", (req, res) => {
  res.locals.meta = {
    title: "Public Stories"
  };
  StorySchema.find({ status: "public" })
    .then((Stories) => {
      res.render("Story/showstories", {
        Stories: Stories
      });
    })
    .catch((err) => console.log(err));
});

//Import Google_Login Route File
const Auth = require("./routes/G_Route");

//Import Story Route

const Story = require("./routes/Story_route");

//Route Paths
app.use("/auth", Auth);
app.use("/story", Story);

//Port
const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Server Running At Port: ${Port}`));
