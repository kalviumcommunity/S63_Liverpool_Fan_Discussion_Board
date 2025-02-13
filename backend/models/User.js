const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password for security
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
