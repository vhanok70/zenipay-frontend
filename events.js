const EVENTS = [];

function trackEvent(name, data = {}) {
  const event = {
    name,
    data,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  EVENTS.push(event);
  console.log("EVENT:", event);

  // Later → send to backend API
  // fetch("https://zenipay-backend/events", { ... })
}
