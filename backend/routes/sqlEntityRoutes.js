const express = require("express");
const router = express.Router();
const { Entity, User } = require("../sqlModels");

// ✅ Create a new entity with user association
router.post("/", async (req, res) => {
  try {
    const { name, created_by } = req.body;
    
    if (!name || !created_by) {
      return res.status(400).json({ error: "Entity name and user ID are required" });
    }
    
    // Check if entity already exists
    const existingEntity = await Entity.findOne({ where: { name } });
    if (existingEntity) {
      return res.status(400).json({ error: "Entity with this name already exists" });
    }
    
    // Check if user exists
    const user = await User.findByPk(created_by);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Create entity
    const newEntity = await Entity.create({ name, created_by });
    
    res.status(201).json({ 
      message: "Entity created successfully", 
      entity: newEntity 
    });
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all entities with creator information
router.get("/", async (req, res) => {
  try {
    const entities = await Entity.findAll({
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    res.status(200).json(entities);
  } catch (error) {
    console.error("Error fetching entities:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get entity by ID with creator information
router.get("/:id", async (req, res) => {
  try {
    const entity = await Entity.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    if (!entity) {
      return res.status(404).json({ error: "Entity not found" });
    }
    
    res.status(200).json(entity);
  } catch (error) {
    console.error("Error fetching entity:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get entities by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get entities created by this user
    const entities = await Entity.findAll({
      where: { created_by: userId },
      include: [{
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email']
      }]
    });
    
    res.status(200).json(entities);
  } catch (error) {
    console.error("Error fetching entities by user:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update entity
router.put("/:id", async (req, res) => {
  try {
    const { name, created_by } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (created_by) {
      // Check if user exists
      const user = await User.findByPk(created_by);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      updateData.created_by = created_by;
    }
    
    const [updated] = await Entity.update(updateData, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedEntity = await Entity.findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'email']
        }]
      });
      return res.status(200).json({ 
        message: "Entity updated successfully", 
        entity: updatedEntity 
      });
    }
    
    return res.status(404).json({ error: "Entity not found" });
  } catch (error) {
    console.error("Error updating entity:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete entity
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Entity.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(200).json({ message: "Entity deleted successfully" });
    }
    
    return res.status(404).json({ error: "Entity not found" });
  } catch (error) {
    console.error("Error deleting entity:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;