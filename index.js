const express = require("express");
const passport = require("passport");
const Exp_Session = require("express-session");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const Handlebars = require("express-handlebars");

//Import Key File

const Keys = require("./config/keys");
//Init APP

const app = express();

//Express Session Middleware

app.use(Exp_Session({
    secret : Keys.Secret,
    resave : false,
    saveUninitialized : true
}));

//IMPORT Google Strategy File

require("./Stratergies/google_auth")(passport);

//Static Folder 
app.use(express.static(__dirname+"public"));

//Handlebars MiddleWare

app.engine('handlebars', Handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser MiddleWare
app.use(BodyParser.urlencoded({extended : false}));

//Cookie Parser Middleware
app.use(CookieParser());

//Passport MiddleWares
app.use(passport.initialize());
app.use(passport.session());

//@Type : GET
//@Route : /
//@Desc : Home Route
//@Access : PUBLIC

app.get("/",(req,res) => {
    res.render('index');
});

//Import Google_Login Route File
const Auth = require("./routes/G_Route");

//Route Paths
app.use("/auth",Auth);

//Port
const Port = process.env.PORT || 3000;

app.listen(Port,"localhost",() => console.log(`Server Running At Port: ${Port}`));