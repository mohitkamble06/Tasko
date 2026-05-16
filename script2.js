/* =============================================================
   script2.js — For index2.html (Sign Up / OTP Page)
   ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ── Grab elements from your HTML ──────────────────────────────
  const nameInput   = document.getElementById("username");       // "Name" field
  const emailInput  = document.getElementById("gmail id");       // "Email" field
  const otpInput    = document.getElementById("otp");            // "OTP" field
  const sendOtpBtn  = document.querySelector("aside a button");  // "Send OTP" button

  // ── Store the generated OTP here (only lives in memory) ───────
  let generatedOTP = null;


  // ── Create a status message element ───────────────────────────
  const statusMsg = document.createElement("p");
  statusMsg.style.fontFamily = "calibri";
  statusMsg.style.marginTop  = "10px";
  statusMsg.style.fontStyle  = "italic";

  const form = document.querySelector("form");
  form.insertAdjacentElement("afterend", statusMsg);


  // ── Create a "Verify & Sign Up" button (not in your HTML yet) ─
  const verifyBtn = document.createElement("button");
  verifyBtn.innerHTML       = "<i>Verify OTP & Sign Up</i>";
  verifyBtn.style.marginTop = "16px";
  verifyBtn.style.cursor    = "pointer";
  // Append it after the status message
  statusMsg.insertAdjacentElement("afterend", verifyBtn);


  // ── STEP 1: Send OTP (when "Send OTP" is clicked) ─────────────
  sendOtpBtn.addEventListener("click", (e) => {
    e.preventDefault();   // stop the <a> tag from navigating

    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();

    // --- Validate Name ---
    if (!name) {
      showMessage("Please enter your full name.", "error");
      return;
    }

    // --- Validate Email ---
    if (!email) {
      showMessage("Please enter your email address.", "error");
      return;
    }
    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    // --- Generate a 6-digit OTP ---
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // TODO: In a real project, send this OTP to the user's email
    //       using a backend (Node.js, Firebase, EmailJS, etc.)
    //       For now, we display it so you can test:
    showMessage(`OTP sent to ${email}. (Test OTP: ${generatedOTP})`, "success");

    console.log("Generated OTP:", generatedOTP); // visible in browser console
  });


  // ── STEP 2: Verify OTP (when "Verify & Sign Up" is clicked) ───
  verifyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name      = nameInput.value.trim();
    const email     = emailInput.value.trim();
    const enteredOTP = otpInput.value.trim();

    // Check that OTP was actually sent first
    if (!generatedOTP) {
      showMessage("Please send the OTP first.", "error");
      return;
    }

    // Check OTP field is not empty
    if (!enteredOTP) {
      showMessage("Please enter the OTP.", "error");
      return;
    }

    // Check OTP matches
    if (enteredOTP !== generatedOTP) {
      showMessage("Incorrect OTP. Please try again.", "error");
      otpInput.value = "";   // clear wrong entry
      return;
    }

    // --- OTP matched: account creation success ---
    showMessage(`Account created successfully! Welcome, ${name}!`, "success");

    // TODO: Save user data to your backend/database here.
    // After signup, redirect to login page:
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000); // wait 2 seconds so user can read the success message
  });


  // ── Helper: validate email format ─────────────────────────────
  function isValidEmail(email) {
    // Checks for basic pattern: something@something.something
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // ── Helper: show a status message (green = success, red = error)
  function showMessage(message, type) {
    statusMsg.textContent = message;
    statusMsg.style.color = type === "success" ? "#4caf87" : "#e05c5c";
  }


  // ── Clear status when user edits any field ────────────────────
  nameInput.addEventListener("input",  () => (statusMsg.textContent = ""));
  emailInput.addEventListener("input", () => (statusMsg.textContent = ""));
  otpInput.addEventListener("input",   () => (statusMsg.textContent = ""));

});
