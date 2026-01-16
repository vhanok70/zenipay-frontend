const API_BASE_URL = "https://zenipay-backend.onrender.com";
let currentMobile = "";
function verifyOtp() {
  const otp = document.querySelector("input").value;

  fetch(API_BASE_URL + "/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: currentMobile, otp })
  })
  .then(r => r.json())
  .then(d => {
    console.log("VERIFY RESPONSE:", d);
    screen = "dashboard";
    render();
  })
  .catch(() => alert("OTP verify failed"));
}
function sendLoginOtp() {
  currentMobile = document.querySelector("input").value;

  fetch(API_BASE_URL + "/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: currentMobile, purpose: "LOGIN" })
  })
  .then(r => r.json())
  .then(d => {
    console.log("OTP RESPONSE:", d);
    screen = "otp";
    render();
  })
  .catch(() => alert("API error"));
}
fetch(API_BASE_URL)
  .then(r => r.json())
  .then(d => console.log("API OK:", d))
  .catch(e => console.error("API ERR:", e));
if (typeof trackEvent === "function") {
  trackEvent("APP_OPEN");
}
let screen = "login";

function render() {
  if (screen === "login") loginScreen();
  if (screen === "signup") signupScreen();
  if (screen === "otp") otpScreen();
  if (screen === "dashboard") dashboardScreen();
  if (screen === "send") sendScreen();
  if (screen === "upi") upiScreen();
  if (screen === "bank") bankScreen();
  if (screen === "history") historyScreen();
  if (screen === "offers") offersScreen();
  if (screen === "profile") profileScreen();
}

/* LOGIN */
function loginScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Zenipay</div>

    <div class="container">
      <div class="card" style="text-align:center">
        <h2 style="margin:0 0 6px">Welcome to Zenipay</h2>
        <p style="opacity:.7;margin:0">Smart payments. Smart rewards.</p>
      </div>

      <div class="card">
        <label style="font-size:13px;opacity:.7">Mobile number</label>
        <input class="input" placeholder="Enter 10-digit number" />
        <button class="primary-btn" onclick="sendLoginOtp()">Continue</button>
        <p style="text-align:center;margin-top:12px;opacity:.7">
          New here?
          <span style="color:#3b82f6" onclick="screen='signup';render()">Create account</span>
        </p>
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
        <button class="primary-btn" onclick="verifyOtp()">Verify</button>
      </div>
    </div>
  `;
}

/* DASHBOARD */
function dashboardScreen() {
  document.getElementById("app").innerHTML = `
  <div class="top-bar">
    <div class="brand">Zenipay</div>
    <div class="avatar">V</div>
  </div>

  <div class="hero">
    <div class="hero-title">Total Balance</div>
    <div class="hero-amount">₹0.00</div>
    <div class="hero-sub">Rewards earned this month: ₹0</div>
  </div>

  <div class="quick-grid">
    <div class="quick-card" onclick="screen='send';render()">💸<span>Send</span></div>
    <div class="quick-card">📷<span>Scan</span></div>
    <div class="quick-card">🏦<span>Bank</span></div>
    <div class="quick-card">📱<span>Bills</span></div>
  </div>

  <div class="insight">
    <strong>Zen Tip ✨</strong>
    <p>Complete KYC to unlock instant cashback & higher limits.</p>
    <button class="ghost-btn">Complete KYC</button>
  </div>

  <div class="bottom-nav">
    <div class="active">Home</div>
    <div onclick="screen='send';render()">Pay</div>
    <div onclick="screen='offers';render()">Rewards</div>
    <div onclick="screen='profile';render()">You</div>
  </div>
  `;
}
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
/* OFFERS SCREEN */
function offersScreen() {
  trackEvent("SCREEN_VIEW", { screen: "offers" });

  document.getElementById("app").innerHTML = `
    <div class="header">Offers & Rewards</div>
    <div class="container">

      <div class="card" onclick="trackEvent('OFFER_VIEW',{id:'cashback_10'})">
        <div>💸 10% Cashback</div>
        <small>On first UPI payment • Max ₹50</small>
      </div>

      <div class="card" onclick="trackEvent('OFFER_VIEW',{id:'recharge_25'})">
        <div>📱 ₹25 Recharge Bonus</div>
        <small>Minimum recharge ₹199</small>
      </div>

      <div class="card" onclick="trackEvent('OFFER_VIEW',{id:'refer_100'})">
        <div>🤝 Refer & Earn ₹100</div>
        <small>When friend completes first payment</small>
      </div>

      <button class="secondary-btn" onclick="screen='dashboard';render()">Back</button>
    </div>
  `;
}
/* PROFILE SCREEN */
function profileScreen() {
  trackEvent("SCREEN_VIEW", { screen: "profile" });

  document.getElementById("app").innerHTML = `
    <div class="header">Profile</div>
    <div class="container">

      <div class="card">
        <strong>User Details</strong>
        <p>Name: User</p>
        <p>Mobile: **********</p>
      </div>

      <div class="card">
        <strong>Bank Account</strong>
        <p>Status: Not Linked</p>
        <button class="primary-btn" onclick="trackEvent('BANK_LINK_START')">
          Add Bank Account
        </button>
      </div>

      <div class="card">
        <strong>KYC</strong>
        <p>Status: Pending</p>
        <button class="primary-btn" onclick="trackEvent('KYC_START')">
          Complete KYC
        </button>
      </div>

      <button class="secondary-btn" onclick="screen='dashboard';render()">Back</button>
    </div>
  `;
}
render();
