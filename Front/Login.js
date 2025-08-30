// // script.js

// document.addEventListener("DOMContentLoaded", () => {
//   const orgIdInput = document.getElementById("orgId");
//   const loginBtn = document.getElementById("loginBtn");

//   loginBtn.addEventListener("click", () => {
//     const orgId = orgIdInput.value.trim();

//     if (!orgId) {
//       alert("⚠ Please enter your Organization ID.");
//       return;
//     }

//     // Example validation pattern (e.g., ABC-001, XYZ-123)
//     const orgIdPattern = /^[A-Z]{3}-\d{3}$/;

//     if (!orgIdPattern.test(orgId)) {
//       alert("Invalid Organization ID format. Use format like ABC-001.");
//       return;
//     }

//     // If valid
//     // alert(Login successful for: " + orgId);

//     // Redirect to dashboard (you can change URL)
//     window.location.href = "dispaly.html";
//   });
// });
document.getElementById("loginBtn").addEventListener("click", async () => {
  event.preventDefault(); // stop the default form submit
  window.location.href = "Home.html"; // redirect to front.html
  const orgId = document.getElementById("orgId").value.trim();

  if (!orgId) {
    alert("Please enter Organization ID");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ orgId }),
    });

    // Handle non-200 responses gracefully
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Server error");
    }

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      console.log("Login Response:", data);

      //  Redirect after successful login (optional)
      // window.location.href = "/dashboard.html";
    } else {
      alert(" Error: " + data.message);
    }
  } catch (err) {
    console.error(" Login error:", err);
    alert("Server not responding or invalid response.");
  }
});



