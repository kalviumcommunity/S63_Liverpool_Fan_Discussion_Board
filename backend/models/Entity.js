const mongoose = require("mongoose");

const EntitySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("Entity", EntitySchema);
