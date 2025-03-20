const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// ✅ Create a Post with Validation
router.post("/", async (req, res) => {
    try {
        const { title, content, created_by } = req.body;

        // Manual validation before inserting into DB
        if (!title || title.length < 5 || title.length > 100) {
            return res.status(400).json({ error: "Title must be between 5 and 100 characters." });
        }
        if (!content || content.length < 10) {
            return res.status(400).json({ error: "Content must be at least 10 characters long." });
        }
        if (!created_by) {
            return res.status(400).json({ error: "Creator is required." });
        }

        const newPost = new Post({ title, content, created_by });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    } catch (error) {
        res.status(500).json({ error: "Failed to create post", details: error.message });
    }
});

// ✅ Read All Posts with User Details
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("created_by", "username email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a Post by ID with Validation
router.put("/:id", async (req, res) => {
    try {
        const { title, content } = req.body;

        // Manual validation before updating
        if (title && (title.length < 5 || title.length > 100)) {
            return res.status(400).json({ error: "Title must be between 5 and 100 characters." });
        }
        if (content && content.length < 10) {
            return res.status(400).json({ error: "Content must be at least 10 characters long." });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to update post", details: error.message });
    }
});

// ✅ Delete a Post by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Fetch Posts by Specific User
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ created_by: userId }).populate("created_by", "username email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
