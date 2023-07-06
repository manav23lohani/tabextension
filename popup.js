const saveBtn = document.getElementById('saveButton');
const loadBtn = document.getElementById('openTabs');
saveBtn.addEventListener('click', () => { 
    chrome.tabs.query({}, function(tabs) {
        var tabGroup = [];
      
        tabs.forEach(function(tab) {
            // console.log(tab.url);
          var tabInfo = {
            url: tab.url,
            title: tab.title
          };
          tabGroup.push(tabInfo);
        });
      
        // Store tabGroup in local storage

    });
});
  

  





// chrome.storage.local.get(['tabGroup'], function(result) {
//     var storedTabGroup = result.tabGroup;
//     if (storedTabGroup) {
//       console.log(storedTabGroup);
//     }
//   });