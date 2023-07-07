window.onload = () => {
  const saveBtn = document.getElementById("saveButton");
  const deleteBtn = document.getElementById("deleteButton")
  const addList = document.getElementById("list")


  let storageItems = JSON.parse(localStorage.getItem('tabs'));
  storageItems.forEach((item, i) => {
    addList.innerHTML += `<li class="links">${item}</li>`;
  });

  let links = document.getElementsByClassName("links")

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (e) => {
      window.open(e.target.innerHTML, "_blank");
    })

  }

  saveBtn.addEventListener("click", () => {

    chrome.tabs.query({}, function (tabs) {
      var tabGroup = [];
      tabs.forEach(function (tab) {
        tabGroup.push(tab.url);
      });
      localStorage.setItem('tabs', JSON.stringify(tabGroup));

    });

  });


  deleteBtn.addEventListener("click", () => {
    localStorage.removeItem('tabs');
    addList.innerHTML = "";
  })

}