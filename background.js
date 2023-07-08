// background.js (background script)

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'saveTabs') {
    const key = message.key;
    saveTabsToStorage(key, sendResponse);
    return true; 
  } else if (message.action === 'openTabs') {
    const key = message.key;
    openTabsFromStorage(key);
  }
});

function saveTabsToStorage(key, callback) {
  chrome.tabs.query({}, function(tabs) {
    const urls = tabs.map(tab => tab.url);
    const data = { [key]: urls };
    chrome.storage.local.set(data, function() {
      callback('Tabs saved successfully!');
    });
  });
}

function openTabsFromStorage(key) {
  chrome.storage.local.get(key, function(result) {
    const storedTabs = result[key];
    if (storedTabs) {
      storedTabs.forEach((url, index) => {
        
          chrome.tabs.create({ url });
        
      });
    }
  });
}

  
