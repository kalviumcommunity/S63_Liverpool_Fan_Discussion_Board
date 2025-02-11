const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    date: { type: Date, required: true },
    score: { type: String },
    stadium: { type: String, required: true }
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
