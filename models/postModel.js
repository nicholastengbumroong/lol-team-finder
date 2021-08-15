const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  postInfo: Schema.Types.Mixed,
  date: Date,
  isVerified: Boolean,
  password: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
