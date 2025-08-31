// Load credits dynamically from backend
window.onload = async function () {
  try {
    const res = await fetch("http://localhost:5000/api/credits");
    const credits = await res.json();

    const select = document.getElementById("creditId");
    select.innerHTML = '<option value="">-- choose --</option>';

    credits.forEach((credit) => {
      if (!credit.retired) { // only show active credits
        const option = document.createElement("option");
        option.value = credit.id;
        option.textContent = `${credit.id} — ${credit.type} (${credit.volume} kg)`;
        select.appendChild(option);
      }
    });
  } catch (err) {
    alert("Failed to load credits.");
  }
};

// Handle retire form
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const creditId = document.getElementById("creditId").value;
  const amount = Number(document.getElementById("amount").value);

  if (!creditId) {
    alert("Please select a credit.");
    return;
  }
  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/credits/${creditId}/retire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Credit Retired!\n\nID: ${data.credit.id}\nAmount: ${data.credit.retiredAmount} kg`);
      window.location.href = "display.html";
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("Failed to connect to server.");
  }
});

// Cancel button
document.querySelector(".btn-cancel").addEventListener("click", function () {
  window.location.href = "Home.html";
});
