const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");
const clientRoutes = require("./routes/clients");
const taskRoutes = require("./routes/tasks");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.get("/", (req, res) => {
 res.send("Week 5 Task Management API is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
 console.log(`Week 5 server running on port ${PORT}`);
});