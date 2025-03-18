const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// ✅ Add a Comment
router.post("/comments", async (req, res) => {
    try {
        const { postId, author, content } = req.body;

        if (!postId || !author || !content) {
            return res.status(400).json({ error: "Post ID, author, and content are required." });
        }

        const newComment = new Comment({ postId, author, content });
        await newComment.save();
        res.status(201).json({ message: "Comment added!", comment: newComment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Comments for a Post
router.get("/comments/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
