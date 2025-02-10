require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import MongoDB connection function
const postRoutes = require("./routes/routes"); // Import routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Liverpool Fan Discussion Board API is Running! 🔴⚽");
});

// Use Routes
app.use("/api", postRoutes); // All routes are prefixed with /api

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
