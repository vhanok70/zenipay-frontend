let screen = "dashboard";

function render() {
  if (screen === "dashboard") dashboardScreen();
  if (screen === "send") sendScreen();
  if (screen === "upi") upiScreen();
  if (screen === "bank") bankScreen();
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
        <div class="action-btn" onclick="screen='send';render()">Send</div>
        <div class="action-btn">Receive</div>
        <div class="action-btn">History</div>
      </div>
    </div>
  `;
}

function sendScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Send Money</div>
    <div class="container">
      <div class="action-btn" onclick="screen='upi';render()">Send via UPI</div>
      <div class="action-btn" onclick="screen='bank';render()">Send to Bank</div>
      <br/>
      <button class="secondary-btn" onclick="screen='dashboard';render()">Back</button>
    </div>
  `;
}

function upiScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">UPI Transfer</div>
    <div class="container">
      <input class="input" placeholder="UPI ID (example@upi)" />
      <input class="input" placeholder="Amount ₹" type="number" />
      <button class="primary-btn">Pay</button>
      <button class="secondary-btn" onclick="screen='send';render()">Back</button>
    </div>
  `;
}

function bankScreen() {
  document.getElementById("app").innerHTML = `
    <div class="header">Bank Transfer</div>
    <div class="container">
      <input class="input" placeholder="Account Holder Name" />
      <input class="input" placeholder="Account Number" />
      <input class="input" placeholder="IFSC Code" />
      <input class="input" placeholder="Amount ₹" type="number" />
      <button class="primary-btn">Send</button>
      <button class="secondary-btn" onclick="screen='send';render()">Back</button>
    </div>
  `;
}

render();
