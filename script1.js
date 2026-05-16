/* =============================================================
   script.js — For index.html (Login Page)
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ── Grab the elements from your HTML ──────────────────────────
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn      = document.querySelector("aside a button");

  // ── Create an error message element to show below the form ────
  const errorMsg = document.createElement("p");
  errorMsg.style.color      = "#e05c5c";   // red color for errors
  errorMsg.style.fontFamily = "calibri";
  errorMsg.style.marginTop  = "10px";
  errorMsg.style.fontStyle  = "italic";

  // Insert the error message just after the form
  const form = document.querySelector("form");
  form.insertAdjacentElement("afterend", errorMsg);


  // ── Handle Login Button Click ──────────────────────────────────
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();   // stop the <a> tag from navigating away

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // --- Validation ---

    // 1. Check if fields are empty
    if (!username && !password) {
      showError("Please enter your username and password.");
      return;
    }
    if (!username) {
      showError("Username cannot be empty.");
      return;
    }
    if (!password) {
      showError("Password cannot be empty.");
      return;
    }

    // 2. Check minimum password length
    if (password.length < 6) {
      showError("Password must contain at least 6 characters.");
      return;
    }

    // --- All good: clear error and proceed ---
    errorMsg.textContent = "";

    // TODO: Replace this alert with your actual login logic
    //       e.g., send to a backend API or check against saved users
    alert(`Welcome back, ${username}! Login successful.`);

    // After successful login, you could redirect like this:
    // window.location.href = "dashboard.html";
  });


  // ── Helper: show an error message ─────────────────────────────
  function showError(message) {
    errorMsg.textContent = message;

    // Shake the form slightly to draw attention
    form.style.transition = "transform 0.1s";
    form.style.transform  = "translateX(8px)";
    setTimeout(() => (form.style.transform = "translateX(-8px)"), 100);
    setTimeout(() => (form.style.transform = "translateX(0)"),    200);
  }


  // ── Clear error when user starts typing again ──────────────────
  usernameInput.addEventListener("input", () => (errorMsg.textContent = ""));
  passwordInput.addEventListener("input", () => (errorMsg.textContent = ""));


  // ── Allow pressing Enter key to trigger login ──────────────────
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });

});
