const saveBtn = document.getElementById("saveButton");
const loadBtn = document.getElementById("loadButton");
const inputName = document.getElementById("inputName");

saveBtn.addEventListener("click", () => {
  const name = inputName.value;
  if (name) {
    chrome.tabs.query({}, function (tabs) {
      var tabGroup = [];

      tabs.forEach(function (tab) {
        // console.log(tab.url);
        tabGroup.push(tab.url);
      });
      localStorage.setItem(name, JSON.stringify(tabGroup));
    });
  }
});

loadBtn.addEventListener("click", () => {
  const name = inputName.value;
  if (name) {
    const tabs = JSON.parse(localStorage.getItem(name));
    // console.log(tabs);
    tabs.forEach((url)=>{
      window.open(url, "_blank");
    })
  }
});