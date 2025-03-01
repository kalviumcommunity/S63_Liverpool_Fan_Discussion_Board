require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import MongoDB connection function
const postRoutes = require("./routes/posts"); // Import routes
const entityRoutes = require("./routes/entities");




const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", entityRoutes);

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
