// popup.js

// Function to fetch all saved tabs from storage
function fetchSavedTabs(callback) {
  chrome.storage.local.get(null, function(result) {
    callback(result);
  });
}

// Function to delete a tab group and its saved tabs
function deleteTabGroup(key) {
  chrome.storage.local.remove(key, function() {
    console.log(`Tab group '${key}' deleted successfully.`);
    fetchSavedTabs(displaySavedTabs);
  });
}

// Function to display saved tabs and open them on click
function displaySavedTabs(savedTabs) {
  const savedTabKeys = Object.keys(savedTabs);

  const tabList = document.getElementById('tabList');

  // Clear previous tab list
  while (tabList.firstChild) {
    tabList.firstChild.remove();
  }

  // Create list items for each saved tab
  savedTabKeys.forEach(key => {
    const tabItem = document.createElement('li');
    
    const groupName = document.createElement('div');
    groupName.textContent = key;
    groupName.className = 'grpname';
    tabItem.append(groupName);
    
    // Create delete button for each tab group
    const deleteicon = document.createElement('div');
    deleteicon.className = 'fa fa-close cross';
    deleteicon.addEventListener('click', function(event) {
      event.stopPropagation();
      deleteTabGroup(key);
    });

    tabItem.appendChild(deleteicon);
    groupName.addEventListener('click', function() {
      openTabsFromStorage(key);
    });
    tabList.appendChild(tabItem);
  });
}


// Function to handle saving tabs
function saveTabs() {
  const key = document.getElementById('key').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    chrome.runtime.sendMessage({ action: 'saveTabs', key: key }, function(response) {
      console.log('Tabs saved successfully!');
      fetchSavedTabs(displaySavedTabs);
    });
  });
}

function openTabsFromStorage(key) {
  chrome.runtime.sendMessage({ action: 'openTabs', key: key });
}

// Attach click event handlers to the buttons
document.getElementById('saveButton').addEventListener('click', saveTabs);

// Fetch saved tabs and display them
fetchSavedTabs(displaySavedTabs);
