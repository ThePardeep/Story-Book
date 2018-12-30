module.exports = {
    client_id:process.env.GOOGLE_CLIENT_ID,
    client_secret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback',
    MongooseURL : process.env.MONGO_URI,
    Secret : "CK72??"
}

