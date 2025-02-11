const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    reportId: { type: String, required: true, unique: true },
    reportedBy: { type: String, required: true }, // User ID of the reporter
    reason: { type: String, required: true },
    postId: { type: String, required: true } // The ID of the reported post
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
