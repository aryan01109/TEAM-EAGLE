// Handle form submission for issuing new credit


document.getElementById("issueForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const volume = document.getElementById("volume").value.trim();
  const source = document.getElementById("source").value.trim();

  // Validation
  if (volume === "" || isNaN(volume) || Number(volume) <= 0) {
    alert("Please enter a valid volume (kg).");
    return;
  }
  if (source === "") {
    alert("Please enter a renewable source.");
    return;
  }

  // Create new credit object
  const newCredit = {
    id: `CRED-${Date.now()}`, // unique ID
    type: source,
    volume: Number(volume),
    owner: "Org-A" // default owner (you can change this later)
  };

  // Save credit to localStorage (so Display page can read it)
  let credits = JSON.parse(localStorage.getItem("credits")) || [];
  credits.push(newCredit);
  localStorage.setItem("credits", JSON.stringify(credits));

  alert(`Hydrogen Credit Issued!\n\nID: ${newCredit.id}\nVolume: ${newCredit.volume} kg\nSource: ${newCredit.type}`);

  // Redirect back to dashboard (display page)
  window.location.href = "display.html";
});

// Handle Cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "display.html"; // go back without saving
});
