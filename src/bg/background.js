// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        ensureSendMessage(tabs[0].id, {greeting: "hello"});
    });
    chrome.pageAction.setIcon({tabId: tab.id, 'path': 'icons/icon16_active.png'}, function () {
        setTimeout(function () {
            chrome.pageAction.setIcon({tabId: tab.id, 'path': 'icons/icon16.png'});
        }, 500)
    });
});




function ensureSendMessage(tabId, message, callback){
    chrome.tabs.sendMessage(tabId, {ping: true}, function(response){
        if(response && response.pong) { // Content script ready
            chrome.tabs.sendMessage(tabId, message, callback);
        } else { // No listener on the other end
            chrome.tabs.executeScript(tabId, {file: "src/bg/content_script.js"}, function(){
                if(chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    throw Error("Unable to inject script into tab " + tabId);
                }
                // OK, now it's injected and ready
                chrome.tabs.sendMessage(tabId, message, callback);
            });
        }
    });
}


