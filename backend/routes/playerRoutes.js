const express = require("express");
const Player = require("../models/Player");

const router = express.Router();

// ✅ Add a Player
router.post("/players", async (req, res) => {
    try {
        const { name, position, nationality, jerseyNumber } = req.body;

        if (!name || !position || !nationality || !jerseyNumber) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newPlayer = new Player({ name, position, nationality, jerseyNumber });
        await newPlayer.save();
        res.status(201).json({ message: "Player added successfully!", player: newPlayer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Players
router.get("/players", async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
