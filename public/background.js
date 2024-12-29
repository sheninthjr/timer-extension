chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: "index.html",
    type: "popup",
    width: 300,
    height: 180,
    top: 100,
    left: 100,
    focused: true,
  });
});