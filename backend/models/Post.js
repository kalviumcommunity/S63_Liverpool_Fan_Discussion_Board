const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Fixed
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;