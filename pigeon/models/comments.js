const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId:{
      type:String
    },
    username: {
      type: String,
      required: true,
    },
    profilePicture:{
      type:String
    },
    comments: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentSchema);
