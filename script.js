// send message to background for joke
chrome.runtime.sendMessage({name: "fetchJoke"}, (response) => {
    // wait for response

    console.log(response);

    // update display on content script
    document.querySelector('p').innerHTML=response.text;
})

// send message to background for image
chrome.runtime.sendMessage({name: "fetchImage"}, (response) => {
    // wait for response

    console.log(response);

    // update display on content script
    let imageElement = document.querySelector("#unsplashImage");
    let imageLink = document.querySelector("#imageLink");
    let creator = document.querySelector("#creator");

    imageElement.src = response.imageSrc;
    imageLink.setAttribute("href", response.imageLink);
    creator.innerText = response.creatorText;
    creator.setAttribute("href", response.creatorLink);
})