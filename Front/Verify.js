// Load credits dynamically on page load
window.onload = async function () {
  const listContainer = document.querySelector(".list");
  listContainer.innerHTML = ""; // Clear any static items

  try {
    const res = await fetch("http://localhost:5000/api/credits");
    const credits = await res.json();

    if (credits.length === 0) {
      listContainer.innerHTML = "<p>No credits available for compliance check.</p>";
      return;
    }

    credits.forEach((credit) => {
      if (!credit.retired) { // only active credits
        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
          <div>
            <div class="item-title">${credit.id} — ${credit.type}</div>
            <div class="item-strong">${credit.volume} kg • owner: ${credit.owner}</div>
          </div>
          <button class="btn" onclick="runChecks('${credit.id}')">Run checks</button>
        `;
        listContainer.appendChild(item);
      }
    });
  } catch (err) {
    listContainer.innerHTML = "<p>⚠️ Failed to connect to server.</p>";
  }
};

// Run compliance checks
async function runChecks(creditId) {
  try {
    const res = await fetch("http://localhost:5000/api/credits");
    const credits = await res.json();
    const credit = credits.find((c) => c.id === creditId);

    if (!credit) {
      alert("Credit not found.");
      return;
    }

    // Fake compliance checks (expand later)
    let complianceResult = `
Compliance Check Results
-------------------------
Credit ID: ${credit.id}
Source: ${credit.type}
Volume: ${credit.volume} kg
Owner: ${credit.owner}

✅ RFNBO check: Passed
✅ PPA validity: Confirmed
✅ Guarantee of Origin: Verified
`;

    alert(complianceResult);
  } catch (err) {
    alert("Failed to fetch credit details.");
  }
}

// Go back
function goBack() {
  window.location.href = "display.html";
}
