// Load credits dynamically on page load
window.onload = function () {
  let credits = JSON.parse(localStorage.getItem("credits")) || [];
  const listContainer = document.querySelector(".list");
  listContainer.innerHTML = ""; // Clear existing hardcoded items

  if (credits.length === 0) {
    listContainer.innerHTML = "<p>No credits available for compliance check.</p>";
    return;
  }

  credits.forEach((credit) => {
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
  });
};

// Simulate running compliance checks
function runChecks(creditId) {
  let credits = JSON.parse(localStorage.getItem("credits")) || [];
  let credit = credits.find((c) => c.id === creditId);

  if (!credit) {
    alert("Credit not found.");
    return;
  }

  // Fake compliance checks
  let complianceResult = `
  Compliance Check Results:
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
}

// Go back to dashboard
function goBack() {
  window.location.href = "display.html";
}
