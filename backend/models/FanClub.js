const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    clubId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    membersCount: { type: Number, required: true }
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
