const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    stadium: { type: String, required: true },
    foundedYear: { type: Number, required: true },
    manager: { type: String, required: true }
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
