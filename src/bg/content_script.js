// Content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.ping) {
        sendResponse({pong: true});
        return;
    }
    /* Content script action */
    addTestingNotesFormat();
    chrome.storage.sync.get({
        assignee: '-None-',
        changeAssignee: false,
    }, function (items) {
        if(items.changeAssignee && items.assignee != '-None-') {
            setOwner(items.assignee);
        }
    });
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

function setOwner(ownerName) {
    let ownerElement = document.getElementById('Owner');
    var res = Array.from(ownerElement.options).filter(function (item) {
        return item.text.indexOf(ownerName) >= 0;
    });

    if(res.length > 0) {
        ownerElement.value = res[0].value;
    }
}