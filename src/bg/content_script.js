// Content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.ping) {
        sendResponse({pong: true});
        return;
    }
    /* Content script action */
    addTestingNotesFormat();
});


function addTestingNotesFormat() {
    var testintNotesHeader = '<u><strong>TESTING NOTES</strong></u><br /><br />';
    var contentWrapper = document.querySelector('iframe').contentWindow.document.querySelector('.cke_editable.cke_editable_themed.cke_contents_ltr');
    var newContent = contentWrapper.innerHTML.replace(/(^\w+)+|((<br\s*?>)+.(\w+))/g, function(v) { return v.toUpperCase(); });
    if(newContent.toLowerCase().indexOf('testing notes') < 0) {
        newContent = testintNotesHeader + newContent;
    }
    contentWrapper.innerHTML = newContent;
}
