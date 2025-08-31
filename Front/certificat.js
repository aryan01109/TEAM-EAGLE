// Auto-fill today's date
const today = new Date();
const formattedDate = today.toLocaleDateString();
document.getElementById("date").textContent = formattedDate;

// Example: dynamically set name
const name = "John Doe"; // Replace with dynamic input or API data
document.getElementById("username").textContent = name;
