const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const ExpressError = require("../Custom_err");

// Middleware to parse JSON
app.use(express.json());

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/EAGLE", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
    });
    console.log(" Connected to database!");
  } catch (err) {
    console.error(" Database connection error:", err);
  }
}
main();

// Schema & Model
const orgSchema = new mongoose.Schema({
  orgId: { type: String, required: true, unique: true },
});

const Organization = mongoose.model("Organization", orgSchema);

// Routes
app.post("/login", async (req, res) => {
  console.log("at login page");
  try {
    const { orgId } = req.body;

    if (!orgId) {
      return res.status(400).json({ message: "Organization ID is required" });
    }

    let org = await Organization.findOne({ orgId });

    if (!org) {
      org = new Organization({ orgId });
      await org.save();
      return res.json({
        success: true,
        message: "New organization registered & logged in",
        orgId,
      });
    }

    res.json({ success: true, message: "Login successful", orgId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Error simulation
app.use("/err", (req, res) => {
  abc = abc; // force error
});

// Error handler
app.use((err, req, res, next) => {
  let { status = 500, message = "some error occurred" } = err;
  res.status(status).send(message);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("page not found");
});

// Start server
app.listen(8080, () => {
  console.log("Server is listening at 8080!!!");
});
