const express = require("express");
const router = express.Router();
const Entity = require("../models/Entity");

// ✅ Add an entity (CREATE)
router.post("/entities", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Entity name is required." });
    }

    const newEntity = new Entity({ name });
    await newEntity.save();
    res.status(201).json({ message: "Entity created successfully!", entity: newEntity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all entities (READ)
router.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single entity by ID
router.get("/entities/:id", async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: "Entity not found." });
    }
    res.status(200).json(entity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update an entity (UPDATE)
router.put("/entities/:id", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Entity name is required for update." });
    }

    const updatedEntity = await Entity.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedEntity) {
      return res.status(404).json({ error: "Entity not found." });
    }

    res.status(200).json({ message: "Entity updated successfully!", entity: updatedEntity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete an entity (DELETE)
router.delete("/entities/:id", async (req, res) => {
  try {
    const deletedEntity = await Entity.findByIdAndDelete(req.params.id);
    if (!deletedEntity) {
      return res.status(404).json({ error: "Entity not found." });
    }
    res.status(200).json({ message: "Entity deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
