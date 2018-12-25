const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Import Key File

const Keys = require("../config/keys");


module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: Keys.clientID,
        clientSecret: Keys.Secret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(profile);
    }));
}