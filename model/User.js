const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    googleID : {
        type: String,
        required :true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    gender : {
        type : String
    }
});
module.exports = Mongoose.model("User",UserSchema);