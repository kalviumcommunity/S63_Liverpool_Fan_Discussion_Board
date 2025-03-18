const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// ✅ Send a Notification
router.post("/notifications", async (req, res) => {
    try {
        const { message, type, userId } = req.body;

        if (!message || !type || !userId) {
            return res.status(400).json({ error: "Message, type, and user ID are required." });
        }

        const newNotification = new Notification({ message, type, userId });
        await newNotification.save();
        res.status(201).json({ message: "Notification sent!", notification: newNotification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get Notifications for a User
router.get("/notifications/:userId", async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
