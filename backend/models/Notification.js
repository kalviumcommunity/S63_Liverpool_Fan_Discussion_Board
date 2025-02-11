const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    notificationId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
