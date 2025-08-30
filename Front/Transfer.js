// Populate dropdown with available credits
window.onload = function () {
  let credits = JSON.parse(localStorage.getItem("credits")) || [];
  const creditSelect = document.getElementById("creditId");

  credits.forEach((credit) => {
    let option = document.createElement("option");
    option.value = credit.id;
    option.textContent = `${credit.id} (${credit.volume} kg, Owner: ${credit.owner})`;
    creditSelect.appendChild(option);
  });
};

// Handle transfer form submit
document.querySelector("form").addEventListener("submit", function (e) {
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

  let credits = JSON.parse(localStorage.getItem("credits")) || [];
  let credit = credits.find((c) => c.id === creditId);

  if (!credit) {
    alert("Credit not found.");
    return;
  }

  if (amount > credit.volume) {
    alert("Insufficient credit volume.");
    return;
  }

  // Deduct from current owner
  credit.volume -= amount;

  // Create new credit for recipient
  const newCredit = {
    id: `CRED-${Date.now()}`,
    type: credit.type,
    volume: amount,
    owner: recipient
  };

  credits.push(newCredit);

  // Remove old credit if volume becomes 0
  if (credit.volume <= 0) {
    credits = credits.filter((c) => c.id !== creditId);
  }

  // Save updates
  localStorage.setItem("credits", JSON.stringify(credits));

  alert(`Transfer Successful!\n${amount} kg transferred to ${recipient}`);

  // Redirect back to dashboard
  window.location.href = "display.html";
});

// Handle Cancel button
document.querySelector(".btn-cancel").addEventListener("click", function () {
  window.location.href = "display.html";
});
