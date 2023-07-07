// popup.js (popup script)

function fetchSavedTabs(callback) {
  chrome.storage.local.get(null, function(result) {
    callback(result);
  });
}

function displaySavedTabs(savedTabs) {
  const savedTabKeys = Object.keys(savedTabs);

  if (savedTabKeys.length === 0) {
    console.log('No saved tabs found.');
    return;
  }

  const tabList = document.getElementById('tabList');

  while (tabList.firstChild) {
    tabList.firstChild.remove();
  }


  savedTabKeys.forEach(key => {
    const tabItem = document.createElement('li');
    tabItem.textContent = key;
    tabItem.addEventListener('click', function() {
      openTabs(key);
    });
    tabList.appendChild(tabItem);
  });
}


function saveTabs() {
  const key = document.getElementById('key').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ action: 'saveTabs', key: key }, function(response) {
      console.log('Tabs saved successfully!');
    });
  });
}


function openTabs(key) {
  chrome.runtime.sendMessage({ action: 'openTabs', key: key });
}


document.getElementById('saveButton').addEventListener('click', saveTabs);
document.getElementById('openButton').addEventListener('click', openTabs);


fetchSavedTabs(function(savedTabs) {
  displaySavedTabs(savedTabs);
});
