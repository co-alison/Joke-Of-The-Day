// listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {

    let endpoint = 'https://api.jokes.one/jod';

    if (msg.name == "fetchJoke") {
        
        // call api
        fetch(endpoint).then((res) => {
            // wait for response
            if (res.status !== 200) {
                response({text: 'There was a problem loading the joke of the day.'})
                return;
            }
            res.json().then((data) => {
                // send response
                response({text: data.contents.jokes[0].joke.text})
            });
        }).catch((err) => {
            response({text: 'There was a problem loading the joke of the day.'})
        });

    }

    return true;

})

chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.name == "fetchImage") {
        let client_id = 'Moc4I9WbqzX8MUX3SLP23VdbWaq-t35UZ0bj_4lqv9U';
        let endpoint = `https://api.unsplash.com/photos/random/?client_id=${client_id}&orientation=landscape`;

        // call api
        fetch(endpoint).then((res) => {
            // wait for response
            if (res.status !== 200) {
                console.log('Error. There was a problem with loading the image.');
                console.log('Status: ' + res.status);
                return;
            }
            res.json().then((data) => {
                console.log(data);
                let imageElementSrc = data.urls.regular;
                let imageLinkAttribute = data.links.html;
                let creatorInnerText = data.user.name;
                let createrLinkAttribute = data.user.portfolio_url;
                response({imageSrc: imageElementSrc, imageLink: imageLinkAttribute, creatorText: creatorInnerText, creatorLink: createrLinkAttribute })
            });
        }).catch((err) => {
            console.log("Error: " + err)
            return;
        });
            
    }
    
    return true;


})