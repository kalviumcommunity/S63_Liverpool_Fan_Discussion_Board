const express = require("express");
const Match = require("../models/Match");

const router = express.Router();

// ✅ Add a Match
router.post("/matches", async (req, res) => {
    try {
        const { opponent, date, location, result } = req.body;

        if (!opponent || !date || !location) {
            return res.status(400).json({ error: "Opponent, date, and location are required." });
        }

        const newMatch = new Match({ opponent, date, location, result });
        await newMatch.save();
        res.status(201).json({ message: "Match added successfully!", match: newMatch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Matches
router.get("/matches", async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
