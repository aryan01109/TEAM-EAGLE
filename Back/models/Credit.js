const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  volume: { type: Number, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Credit", creditSchema);
