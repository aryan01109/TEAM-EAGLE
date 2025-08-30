// Load credits from backend
window.onload = async function () {
  try {
    const res = await fetch("http://localhost:5000/api/credits");
    const credits = await res.json();

    const creditSelect = document.getElementById("creditId");
    creditSelect.innerHTML = '<option value="">-- choose --</option>';

    credits.forEach((credit) => {
      if (!credit.retired) {
        let option = document.createElement("option");
        option.value = credit.id;
        option.textContent = `${credit.id} (${credit.volume} kg, Owner: ${credit.owner})`;
        creditSelect.appendChild(option);
      }
    });
  } catch (err) {
    alert("Failed to load credits.");
  }
};

// Handle transfer form submit
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const creditId = document.getElementById("creditId").value;
  const recipient = document.getElementById("recipient").value.trim();
  const amount = Number(document.getElementById("amount").value);

  if (!creditId) {
    alert("Please select a credit ID.");
    return;
  }
  if (recipient === "") {
    alert("Please enter a valid recipient organization.");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid transfer amount.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/credits/${creditId}/transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(`Transfer Successful!\n${amount} kg transferred to ${recipient}`);
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
  window.location.href = "display.html";
});
