require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB"); // Import MongoDB connection function
const postRoutes = require("./routes/posts");
const entityRoutes = require("./routes/entities");

const app = express();

// ✅ Connect to MongoDB first
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Use Routes after connecting to DB
app.use("/api", entityRoutes);
app.use("/api", postRoutes); // All routes are prefixed with /api

// Default route
app.get("/", (req, res) => {
  res.send("Liverpool Fan Discussion Board API is Running! 🔴⚽");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
