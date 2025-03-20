require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./connectDB");

const app = express();

// ✅ Connect to MongoDB first
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Use Routes with Proper Prefix
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/likes", require("./routes/likeRoutes"));
app.use("/api/fanclubs", require("./routes/fanClubRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/players", require("./routes/playerRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/entities", require("./routes/entitiesRoutes"));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Liverpool Fan Discussion Board API is Running! 🔴⚽");
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Handle Uncaught Exceptions & Unhandled Rejections
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  process.exit(1);
});

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));