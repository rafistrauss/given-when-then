function addAndAppendAssignee(newAssignee) {
    var newOption = document.createElement('option');
    newOption.text = newAssignee;
    newOption.value = newAssignee;
    let assignee = document.getElementById('assignee');
    assignee.add(newOption);
    return assignee;
}
function save_name_to_list_of_assignees() {
    var newAssignee = document.getElementById('newAssignee').value;
    var assignee;
    chrome.storage.sync.get({
        listOfAssignees: []
    }, function(obj) {
        let listOfAssignees = obj.listOfAssignees;
        listOfAssignees.push(newAssignee);
        chrome.storage.sync.set({
           listOfAssignees: listOfAssignees
        }, function () {
            assignee = addAndAppendAssignee(newAssignee);
            assignee.value = newAssignee;
        });
    });
}

// Saves options to chrome.storage.sync.
function save_options() {
    var assignee = document.getElementById('assignee').value;
    var changeAssignee = document.getElementById('changeAssignee').checked;
    chrome.storage.sync.set({
        assignee: assignee,
        changeAssignee: changeAssignee
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function clearListOfAssignees() {
    chrome.storage.sync.remove('listOfAssignees');
}

// Restores select box and
//
//
// checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        assignee: '-None-',
        changeAssignee: false,
        listOfAssignees: []
    }, function(items) {
        console.log(items.listOfAssignees);
        items.listOfAssignees.map(function (customAssignee) {
            console.log(customAssignee);
            addAndAppendAssignee(customAssignee);
        });
        document.getElementById('assignee').value = items.assignee;
        document.getElementById('changeAssignee').checked = items.changeAssignee;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('newAssigneeButton').addEventListener('click', save_name_to_list_of_assignees);
document.getElementById('clearListOfAssignees').addEventListener('click', clearListOfAssignees);