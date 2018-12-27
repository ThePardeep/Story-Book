const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Mongoose = require("mongoose");
const User = Mongoose.model("User");

//Import Key File

const Keys = require("../config/keys");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: Keys.client_id,
        clientSecret: Keys.client_secret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const Image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("?")
        );

        //New User
        const NewUser = {
          googleID: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: Image,
          gender: profile.gender
        };

        //Check If User Already Exist

        User.findOne({
          googleID: NewUser.googleID
        })
          .then((user) => {
            if (user) {
              //Return User
              return done(null, user);
            } else {
              //Create New User
              new User(NewUser)
                .save()
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => console.log(err));
  });
};
