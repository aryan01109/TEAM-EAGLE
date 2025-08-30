const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/hydrogenCredits", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const creditSchema = new mongoose.Schema({
  id: String,
  type: String, // renewable source
  volume: Number,
  owner: String,
  issuedAt: { type: Date, default: Date.now },
});

const Credit = mongoose.model("Credit", creditSchema);
app.post("/login", async (req, res) => {
  const { orgId } = req.body;

  if (!orgId) {
    return res.status(400).json({ success: false, message: "Organization ID required" });
  }

  try {
    const org = await Organization.findOne({ orgId });

    if (!org) {
      return res.status(404).json({ success: false, message: "Organization not found" });
    }

    res.json({
      success: true,
      message: `Welcome, ${org.name || org.orgId}!`,
      orgId: org.orgId,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Fetch and render credits from backend
async function fetchCredits() {
  try {
    const res = await fetch("http://localhost:5000/api/credits");
    credits = await res.json();
    renderCredits();
  } catch (err) {
    console.error("Failed to fetch credits", err);
    alert(" Could not load credits from server.");
  }
}

function renderCredits() {
  const creditsSection = document.querySelector(".credits");
  creditsSection.innerHTML = "<h2>Active Credits</h2>"; // reset section

  credits.forEach((credit, index) => {
    const card = document.createElement("div");
    card.className = "credit-card";
    card.innerHTML = `
      <p><strong>${credit.id}</strong> – ${credit.type}</p>
      <p><span class="highlight">${credit.volume} kg</span> — owner:<br><b>${credit.owner}</b></p>
      <button class="small-btn purple" onclick="verifyCredit('${credit.id}')">Verify</button>
    `;
    creditsSection.appendChild(card);
  });

  // Update summary
  document.querySelector(".summary .credit-card").innerHTML = `
    <p>Total credits: <b>${credits.length}</b></p>
    <p>Total volume: <b>${credits.reduce((sum, c) => sum + c.volume, 0)} kg</b></p>
    <small>
      Notes: Data fetched from backend API.
    </small>
  `;
}

// Issue Credit
document.querySelector(".btn.blue").addEventListener("click", async () => {
  try {
    const newCredit = {
      type: "New PPA",
      volume: Math.floor(Math.random() * 100) + 10,
      owner: "Org-A"
    };
    const res = await fetch("http://localhost:5000/api/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCredit)
    });
    const created = await res.json();
    alert(`New credit issued: ${created.id}`);
    fetchCredits();
  } catch (err) {
    alert("Failed to issue credit.");
  }
});

// Transfer Credit
document.querySelector(".btn.orange").addEventListener("click", async () => {
  if (credits.length === 0) return alert("No credits to transfer.");
  const creditId = credits[0].id;

  try {
    const res = await fetch(`http://localhost:5000/api/credits/${creditId}/transfer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newOwner: "Org-B" })
    });
    const updated = await res.json();
    alert(` Transferred ${updated.id} to ${updated.owner}`);
    fetchCredits();
  } catch (err) {
    alert("Failed to transfer credit.");
  }
});

// Retire Credit
document.querySelector(".btn.red").addEventListener("click", async () => {
  if (credits.length === 0) return alert("No credits to retire.");
  const creditId = credits[credits.length - 1].id;

  try {
    await fetch(`http://localhost:5000/api/credits/${creditId}`, { method: "DELETE" });
    alert(` Retired credit: ${creditId}`);
    fetchCredits();
  } catch (err) {
    alert("Failed to retire credit.");
  }
});

// Verify Compliance
document.querySelector(".btn.purple").addEventListener("click", async () => {
  alert("Running full compliance check (server-side)...");
});

// Verify single credit
async function verifyCredit(creditId) {
  try {
    const res = await fetch(`http://localhost:5000/api/credits/${creditId}/verify`);
    const result = await res.json();
    alert(`
Compliance Report for ${creditId}
--------------------------------
${result.message}
    `);
  } catch (err) {
    alert("Failed to verify credit.");
  }
}

// Load credits initially
let credits = [];
fetchCredits();

// Routes
// Issue a new hydrogen credit
app.post("/api/credits", async (req, res) => {
  try {
    const { volume, source } = req.body;

    if (!volume || volume <= 0) {
      return res.status(400).json({ error: "Invalid volume" });
    }
    if (!source || source.trim() === "") {
      return res.status(400).json({ error: "Invalid renewable source" });
    }

    const newCredit = new Credit({
      id: `CRED-${Date.now()}`,
      type: source,
      volume: volume,
      owner: "Org-A",
    });

    await newCredit.save();
    res.json({ message: "Hydrogen Credit Issued", credit: newCredit });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all credits
app.get("/api/credits", async (req, res) => {
  const credits = await Credit.find();
  res.json(credits);
});

// Cancel (delete) a credit
app.delete("/api/credits/:id", async (req, res) => {
  await Credit.deleteOne({ id: req.params.id });
  res.json({ message: "Credit deleted" });
});

// Retire a credit
app.post("/api/credits/:id/retire", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const credit = await Credit.findOne({ id });
    if (!credit) {
      return res.status(404).json({ error: "Credit not found" });
    }

    if (credit.retired) {
      return res.status(400).json({ error: "Credit already retired" });
    }

    if (!amount || amount <= 0 || amount > credit.volume) {
      return res.status(400).json({ error: "Invalid retire amount" });
    }

    credit.retired = true;
    credit.retiredAmount = amount;
    credit.retiredAt = new Date();

    await credit.save();

    res.json({ message: "Credit retired successfully", credit });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Transfer a credit
app.post("/api/credits/:id/transfer", async (req, res) => {
  try {
    const { id } = req.params;
    const { recipient, amount } = req.body;

    const credit = await Credit.findOne({ id });
    if (!credit) {
      return res.status(404).json({ error: "Credit not found" });
    }

    if (credit.retired) {
      return res.status(400).json({ error: "Cannot transfer a retired credit" });
    }

    if (!recipient || recipient.trim() === "") {
      return res.status(400).json({ error: "Invalid recipient" });
    }

    if (!amount || amount <= 0 || amount > credit.volume) {
      return res.status(400).json({ error: "Invalid transfer amount" });
    }

    // Deduct volume from sender
    credit.volume -= amount;

    // Save sender update
    await credit.save();

    // If credit volume becomes 0, remove it
    if (credit.volume <= 0) {
      await Credit.deleteOne({ id });
    }

    // Create new credit for recipient
    const newCredit = new Credit({
      id: `CRED-${Date.now()}`,
      type: credit.type,
      volume: amount,
      owner: recipient,
    });

    await newCredit.save();

    res.json({
      message: `Transferred ${amount} kg to ${recipient}`,
      newCredit,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all credits
app.get("/api/credits", async (req, res) => {
  try {
    const credits = await Credit.find();
    res.json(credits);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
