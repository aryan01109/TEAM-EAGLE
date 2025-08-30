document.getElementById("issueForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const volume = document.getElementById("volume").value.trim();
  const source = document.getElementById("source").value.trim();

  if (volume === "" || isNaN(volume) || Number(volume) <= 0) {
    alert("Please enter a valid volume (kg).");
    return;
  }
  if (source === "") {
    alert("Please enter a renewable source.");
    return;
  }

  // Send to backend
  try {
    const res = await fetch("http://localhost:5000/api/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ volume: Number(volume), source }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Hydrogen Credit Issued!\n\nID: ${data.credit.id}\nVolume: ${data.credit.volume} kg\nSource: ${data.credit.type}`);
      window.location.href = "display.html";
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("Failed to connect to server.");
  }
});

// Handle Cancel button
document.querySelector(".cancel").addEventListener("click", function () {
  window.location.href = "display.html";
});
