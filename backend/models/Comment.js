const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentId: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
