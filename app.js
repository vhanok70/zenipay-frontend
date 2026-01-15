document.getElementById("app").innerHTML = `
  <div class="header">Zenipay</div>

  <div class="container">
    <div class="auth-card">
      <h2>Login / Register</h2>
      <p>Enter your mobile number</p>

      <input
        type="tel"
        placeholder="10-digit mobile number"
        class="input"
        id="mobile"
      />

      <button class="primary-btn" onclick="sendOTP()">Send OTP</button>

      <div id="otp-section" style="display:none;margin-top:16px;">
        <input
          type="number"
          placeholder="Enter OTP"
          class="input"
          id="otp"
        />
        <button class="primary-btn" onclick="verifyOTP()">Verify OTP</button>
      </div>
    </div>
  </div>
`;

function sendOTP() {
  document.getElementById("otp-section").style.display = "block";
}

function verifyOTP() {
  alert("OTP verified (backend coming next)");
}
