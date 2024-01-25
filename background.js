var ignore = false;
browser.runtime.onInstalled.addListener(function() {
  browser.tabs.create({url: "https://schoology.harker.org/calendar"});
});
browser.browserAction.onClicked.addListener(function() {
  browser.tabs.create({url: "https://schoology.harker.org/calendar"});
});
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (ignore || !/.*:\/\/(schoology\.harker\.org|athena\.harker\.org|app\.schoology\.com)\/calendar\/.+\/.+/.test(details.url) || details.method !== "GET") {
      ignore = false;
      return;
    }
    ignore = true;
    browser.tabs.sendMessage(details.tabId, details.url);
  },
  {
    urls: [
      "*://schoology.harker.org/calendar/*",
      "*://athena.harker.org/calendar/*",
      "*://app.schoology.com/calendar/*",
    ],
    types: ["xmlhttprequest"]
  }
);