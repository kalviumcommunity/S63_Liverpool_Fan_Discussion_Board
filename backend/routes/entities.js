const express = require("express");
const router = express.Router();
const Entity = require("../models/Entity");

// Add an entity
router.post("/entities", async (req, res) => {
  try {
    const newEntity = new Entity({ name: req.body.name });
    await newEntity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all entities
router.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
