if (typeof trackEvent === "function") {
  trackEvent("APP_OPEN");
}
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
        <button class="primary-btn" onclick="trackEvent('LOGIN_OTP_REQUEST',{method:'mobile'});screen='otp';render();">Send OTP</button>
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
        <div class="action-btn" onclick="screen='send';render()">Send</div>
        <div class="action-btn">Receive</div>
        <div class="action-btn" onclick="screen='history';render()">History</div>
      </div>
    </div>
  `;
}

render();
/* SEND SCREEN */
function sendScreen() {
  trackEvent("SCREEN_VIEW", { screen: "send" });

  document.getElementById("app").innerHTML = `
    <div class="header">Send Money</div>
    <div class="container">
      <div class="action-btn" onclick="screen='upi';render();trackEvent('SEND_OPTION',{type:'upi'});">
        Send via UPI
      </div>
      <div class="action-btn" onclick="screen='bank';render();trackEvent('SEND_OPTION',{type:'bank'});">
        Send to Bank
      </div>

      <button class="secondary-btn" onclick="screen='dashboard';render()">Back</button>
    </div>
  `;
}

/* UPI SCREEN */
function upiScreen() {
  trackEvent("SCREEN_VIEW", { screen: "upi" });

  document.getElementById("app").innerHTML = `
    <div class="header">UPI Transfer</div>
    <div class="container">
      <input class="input" placeholder="UPI ID (example@upi)" />
      <input class="input" type="number" placeholder="Amount ₹" 
        oninput="trackEvent('PAYMENT_INTENT',{method:'upi'})"/>
      <button class="primary-btn">Pay</button>
      <button class="secondary-btn" onclick="screen='send';render()">Back</button>
    </div>
  `;
}

/* BANK SCREEN */
function bankScreen() {
  trackEvent("SCREEN_VIEW", { screen: "bank" });

  document.getElementById("app").innerHTML = `
    <div class="header">Bank Transfer</div>
    <div class="container">
      <input class="input" placeholder="Account Holder Name" />
      <input class="input" placeholder="Account Number" />
      <input class="input" placeholder="IFSC Code" />
      <input class="input" type="number" placeholder="Amount ₹"
        oninput="trackEvent('PAYMENT_INTENT',{method:'bank'})"/>
      <button class="primary-btn">Send</button>
      <button class="secondary-btn" onclick="screen='send';render()">Back</button>
    </div>
  `;
}
/* HISTORY SCREEN */
function historyScreen() {
  trackEvent("SCREEN_VIEW", { screen: "history" });

  document.getElementById("app").innerHTML = `
    <div class="header">Transaction History</div>
    <div class="container">
      <div class="card">
        <div>UPI Payment</div>
        <small>₹500 • Success</small>
      </div>

      <div class="card">
        <div>Bank Transfer</div>
        <small>₹1200 • Pending</small>
      </div>

      <div class="card">
        <div>Recharge</div>
        <small>₹299 • Failed</small>
      </div>

      <button class="secondary-btn" onclick="screen='dashboard';render()">Back</button>
    </div>
  `;
}
