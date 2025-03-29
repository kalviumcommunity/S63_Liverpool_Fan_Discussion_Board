const express = require("express");
const router = express.Router();
const { User } = require("../sqlModels");
const bcrypt = require("bcrypt");

// ✅ Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    
    // Find user by username
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Set username in cookie
    res.cookie('username', user.username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'strict'
    });
    
    // Return user without password
    const userResponse = user.toJSON();
    delete userResponse.password;
    
    res.status(200).json({ 
      message: "Login successful", 
      user: userResponse 
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Logout user
router.post("/logout", (req, res) => {
  try {
    // Clear the username cookie
    res.clearCookie('username');
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password from response
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] } // Exclude password from response
    });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    // Create user (password will be hashed by the model hooks)
    const newUser = await User.create({ username, email, password });
    
    // Return user without password
    const userResponse = newUser.toJSON();
    delete userResponse.password;
    
    res.status(201).json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update user
router.put("/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updateData = {};
    
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    
    const [updated] = await User.update(updateData, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
      });
      return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
    
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
    
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;