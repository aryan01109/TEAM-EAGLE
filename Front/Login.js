// script.js

document.addEventListener("DOMContentLoaded", () => {
  const orgIdInput = document.getElementById("orgId");
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const orgId = orgIdInput.value.trim();

    if (!orgId) {
      alert("⚠ Please enter your Organization ID.");
      return;
    }

    // Example validation pattern (e.g., ABC-001, XYZ-123)
    const orgIdPattern = /^[A-Z]{3}-\d{3}$/;

    if (!orgIdPattern.test(orgId)) {
      alert("Invalid Organization ID format. Use format like ABC-001.");
      return;
    }

    // If valid
    // alert(Login successful for: " + orgId);

    // Redirect to dashboard (you can change URL)
    window.location.href = "dispaly.html";
  });
});