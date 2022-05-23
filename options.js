// save options to chrome.storage
function save_options() {
    var type = document.getElementById('type').value;
    console.log(type);

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
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        console.log('Saved.');
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
