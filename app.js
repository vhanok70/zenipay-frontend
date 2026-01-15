let screen = "login";

function render() {
  if (screen === "login") loginScreen();
  if (screen === "signup") signupScreen();
  if (screen === "otp") otpScreen();
  if (screen === "dashboard") dashboardScreen();
}

/* LOGIN */
function loginScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Zenipay</div>
    <div class="container">
      <div class="auth-card">
        <h2>Login</h2>
        <input class="input" placeholder="Mobile Number" />
        <button class="primary-btn" onclick="screen='otp';render()">Send OTP</button>
        <p class="link" onclick="screen='signup';render()">New user? Sign up</p>
      </div>
    </div>
  `;
}

/* SIGN UP */
function signupScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Zenipay</div>
    <div class="container">
      <div class="auth-card">
        <h2>Create Account</h2>
        <input class="input" placeholder="Full Name" />
        <input class="input" placeholder="Mobile Number" />
        <button class="primary-btn" onclick="screen='otp';render()">Register & Send OTP</button>
        <p class="link" onclick="screen='login';render()">Already have account? Login</p>
      </div>
    </div>
  `;
}

/* OTP */
function otpScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Verify OTP</div>
    <div class="container">
      <div class="auth-card">
        <input class="input" placeholder="Enter OTP" />
        <button class="primary-btn" onclick="screen='dashboard';render()">Verify</button>
      </div>
    </div>
  `;
}

/* DASHBOARD */
function dashboardScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Zenipay</div>
    <div class="container">
      <div class="balance-card">
        <div>Wallet Balance</div>
        <div class="balance-amount">₹0.00</div>
      </div>

      <div class="actions">
        <div class="action-btn">Send</div>
        <div class="action-btn">Receive</div>
        <div class="action-btn">History</div>
      </div>
    </div>
  `;
}

render();
