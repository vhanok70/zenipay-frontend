let screen = "auth";

function render() {
  if (screen === "auth") authScreen();
  if (screen === "dashboard") dashboardScreen();
}

function authScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Zenipay</div>
    <div class="container">
      <div class="auth-card">
        <h2>Login</h2>
        <input class="input" placeholder="Mobile number" />
        <button class="primary-btn" onclick="screen='dashboard';render()">
          Continue
        </button>
      </div>
    </div>
  `;
}

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
