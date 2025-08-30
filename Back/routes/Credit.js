const express = require("express");
const router = express.Router();
const Credit = require("../models/Credit");

// Get all credits
router.get("/", async (req, res) => {
  try {
    const credits = await Credit.find();
    res.json(credits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Issue credit
router.post("/", async (req, res) => {
  try {
    const credit = new Credit(req.body);
    await credit.save();
    res.status(201).json(credit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Transfer credit (update owner)
router.put("/:id/transfer", async (req, res) => {
  try {
    const credit = await Credit.findOneAndUpdate(
      { id: req.params.id },
      { owner: req.body.owner },
      { new: true }
    );
    if (!credit) return res.status(404).json({ message: "Credit not found" });
    res.json(credit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retire credit (delete)
router.delete("/:id", async (req, res) => {
  try {
    const credit = await Credit.findOneAndDelete({ id: req.params.id });
    if (!credit) return res.status(404).json({ message: "Credit not found" });
    res.json({ message: `Credit ${credit.id} retired` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
