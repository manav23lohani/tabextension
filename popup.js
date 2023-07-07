function saveTabs() {
  const key = document.getElementById('key').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ action: 'saveTabs', key: key }, function(response) {
      console.log('Tabs saved successfully!');
    });
  });
}

function openTabs() {
  const key = document.getElementById('key').value;
  chrome.runtime.sendMessage({ action: 'openTabs', key: key });
}

document.getElementById('saveButton').addEventListener('click', saveTabs);
document.getElementById('openButton').addEventListener('click', openTabs);
