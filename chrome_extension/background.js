chrome.action.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    
    // what do i want when button is clicked: start transcribing, summarizing yt video
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    }, () => {
        chrome.tabs.sendMessage(tab.id);
    });
}
