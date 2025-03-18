const express = require("express");
const Team = require("../models/Team");

const router = express.Router();

// ✅ Add a Team
router.post("/teams", async (req, res) => {
    try {
        const { name, foundedYear, stadium, manager } = req.body;

        if (!name || !foundedYear || !stadium || !manager) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newTeam = new Team({ name, foundedYear, stadium, manager });
        await newTeam.save();
        res.status(201).json({ message: "Team added successfully!", team: newTeam });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Teams
router.get("/teams", async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
