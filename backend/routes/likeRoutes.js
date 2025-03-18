const express = require("express");
const Like = require("../models/Like");

const router = express.Router();

// ✅ Like a Post
router.post("/likes", async (req, res) => {
    try {
        const { postId, userId } = req.body;

        if (!postId || !userId) {
            return res.status(400).json({ error: "Post ID and User ID are required." });
        }

        const newLike = new Like({ postId, userId });
        await newLike.save();
        res.status(201).json({ message: "Post liked!", like: newLike });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Likes for a Post
router.get("/likes/:postId", async (req, res) => {
    try {
        const likes = await Like.find({ postId: req.params.postId });
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
