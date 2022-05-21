// send message to background
chrome.runtime.sendMessage({name: "fetchJoke"}, (response) => {
    // wait for response

    console.log(response);

    // update display on content script
    document.querySelector('h1').innerHTML=response.text;
    document.querySelector('p').innerHTML=response.title;
})