document.getElementById("loginBtn1").addEventListener("click", function(event) {
       event.preventDefault(); // stop the default form submit
       window.location.href = "certification.html"; // redirect to front.html
  });
  document.getElementById("loginBtn2").addEventListener("click", function(event) {
       event.preventDefault(); // stop the default form submit
       window.location.href = "certification.html"; // redirect to front.html
  });
let credits = [
  { id: "CRED-001", type: "Solar PPA", volume: 120, owner: "Org-A" },
  { id: "CRED-002", type: "Wind PPA", volume: 50, owner: "Org-A" }
];


function renderCredits() {
  const creditsSection = document.querySelector(".credits");
  creditsSection.innerHTML = "<h2>Active Credits</h2>"; // reset section
  document.getElementById("Certificate").addEventListener("click", function(event) {
       event.preventDefault(); // stop the default form submit
       window.location.href = "{certification.html}"; // redirect to front.html
  });


  credits.forEach((credit, index) => {
    const card = document.createElement("div");
    card.className = "credit-card";
    card.innerHTML = `
      <p><strong>${credit.id}</strong> – ${credit.type}</p>
      <p><span class="highlight">${credit.volume} kg</span> — owner:<br><b>${credit.owner}</b></p>
       
`;
creditsSection.appendChild(card);
});

  // Update summary
  document.querySelector(".summary .credit-card").innerHTML = `
    <p>Total credits: <b>${credits.length}</b></p>
    <p>Total volume: <b>${credits.reduce((sum, c) => sum + c.volume, 0)} kg</b></p>
    <small>
      Notes: This prototype shows local mock state only. Replace with API/blockchain calls for production.
    </small>
  `;
}


// Issue Credit
document.querySelector(".btn.blue").addEventListener("click", () => {
  event.preventDefault(); // stop the default form submit
  window.location.href = "Issue.html"; // redirect to 
  const newCredit = {
    id: newId,
    type: "New PPA",
    volume: Math.floor(Math.random() * 100) + 10,
    owner: "Org-A"
  };
  credits.push(newCredit);
  renderCredits();
  // alert(`New credit issued: ${newId}`);
});

// Transfer Credit
document.querySelector(".btn.orange").addEventListener("click", () => {
  event.preventDefault(); // stop the default form submit
  window.location.href = "Transfer.html"; // redirect to 
  if (credits.length === 0) return alert("No credits to transfer.");
  credits[0].owner = "Org-B"; // demo: transfer first credit
  renderCredits();
  // alert(`Transferred ${credits[0].id} to Org-B`);
});


document.querySelector(".btn.red").addEventListener("click", () => {
  event.preventDefault(); // stop the default form submit
  window.location.href = "Retire.html"; // redirect to 
  if (credits.length === 0) return alert("No credits to retire.");
  const retired = credits.pop();
  renderCredits();
  // alert(`Retired credit: ${retired.id}`);
});

// Verify Compliance
document.querySelector(".btn.purple").addEventListener("click", () => {
  event.preventDefault(); // stop the default form submit
  window.location.href = "Verify.html"; // redirect to 
  // alert("Compliance check complete  (mocked).");
});


// function verifyCredit(/Certificate/certification.html) {
  // alert(`Credit ${credits[index].id} verified `);
// }


renderCredits();

