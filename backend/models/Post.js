const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true }, // Unique Post Identifier
  userId: { type: String, required: true }, // User who posted
  title: { type: String, required: true }, // Post Title
  content: { type: String, required: true }, // Post Content
  likes: { type: Number, default: 0 }, // Number of Likes
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("Post", postSchema);
