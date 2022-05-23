// save options to chrome.storage
function save_options() {
    let type = document.getElementById('type').value;
    let id = document.getElementById('id').value;
    if (!isNaN(id) && id.length == 7) {
        chrome.runtime.sendMessage({name: "id" + id});
        document.getElementById('id-status').textContent = '';
    } else if (id.length == 0) {
        document.getElementById('id-status').textContent = '';
    } else {
        document.getElementById('id-status').textContent = 'Invalid ID';
    }
    switch(type) {
        default:
            chrome.runtime.sendMessage({name: "jod"});
            break;
        case "animal":
            chrome.runtime.sendMessage({name: "animal"});
            break;
        case "blonde":
            chrome.runtime.sendMessage({name: "blonde"});
            break;
        case "knock-knock":
            chrome.runtime.sendMessage({name: "knock-knock"});
            break;
    }
    chrome.storage.sync.set({
        jokeType: type
    }, () => {
        // update status to let user know options were saved
        let status = document.getElementById('options-status');
        if (document.getElementById('id-status').textContent !== 'Invalid ID') {
            status.textContent = 'Options saved.';
            console.log('Saved.');
        }
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
}

// restores select box using the preferences stored in chrome.storage
function restore_options() {
    // use default value type = 'Joke Of The Day'
    chrome.storage.sync.get({
        jokeType: 'Joke Of The Day'
    }, (items) => {
        document.getElementById('type').value = items.jokeType;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
