const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  name: String,
  position: String,
  comment: String,
  date: Date
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
