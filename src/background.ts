// chrome.windows.getAll({  }, (windows) => console.log(windows))
chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    if (tabs.length === 0) return;
    await chrome.tabs.reload(tabs[0].id);
});

