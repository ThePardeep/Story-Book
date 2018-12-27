const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = {
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  allowcomment: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  comment: [
    {
      CommentBody: {
        type: String,
        required: true
      },
      CommentUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      CommentDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
};

module.exports = mongoose.model("Story", StorySchema);
