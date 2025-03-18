const express = require("express");
const Report = require("../models/Report");

const router = express.Router();

// ✅ Report a Post or Comment
router.post("/reports", async (req, res) => {
    try {
        const { reportedItemId, reportedBy, reason } = req.body;

        if (!reportedItemId || !reportedBy || !reason) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newReport = new Report({ reportedItemId, reportedBy, reason });
        await newReport.save();
        res.status(201).json({ message: "Report submitted!", report: newReport });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Get All Reports
router.get("/reports", async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
