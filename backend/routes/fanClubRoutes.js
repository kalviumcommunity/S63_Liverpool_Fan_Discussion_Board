const express = require("express");
const FanClub = require("../models/FanClub");

const router = express.Router();

// ✅ Create a Fan Club
router.post("/fanclubs", async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;

        if (!name || !description || !createdBy) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newFanClub = new FanClub({ name, description, createdBy });
        await newFanClub.save();
        res.status(201).json({ message: "Fan Club created successfully!", fanClub: newFanClub });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get all Fan Clubs
router.get("/fanclubs", async (req, res) => {
    try {
        const fanClubs = await FanClub.find();
        res.status(200).json(fanClubs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
