const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    playerId: { type: String, required: true, unique: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 }
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
