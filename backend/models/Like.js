const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    likeId: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
