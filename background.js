let endpoint = 'https://api.jokes.one/jod';
let collection_param = '';

// listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    
    if (msg.name == "jod") {
        endpoint = 'https://api.jokes.one/jod';
    }
    if (msg.name == "animal") {
        endpoint = 'https://api.jokes.one/jod?category=animal';
    }
    if (msg.name == "blonde") {
        endpoint = 'https://api.jokes.one/jod?category=blonde';
    }
    if (msg.name == "knock-knock") {
        endpoint = 'https://api.jokes.one/jod?category=knock-knock';
    }

    console.log(endpoint);

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

    if (msg.name.startsWith("id")) {
        let id = msg.name.slice(2);
        collection_param = "&collections=" + id;
        console.log(collection_param);
    }

    if (msg.name == "fetchImage") {
        let client_id = 'Moc4I9WbqzX8MUX3SLP23VdbWaq-t35UZ0bj_4lqv9U';
        let unsplash_endpoint = `https://api.unsplash.com/photos/random/?client_id=${client_id}&orientation=landscape${collection_param}`;

        // call api
        fetch(unsplash_endpoint).then((res) => {
            // wait for response
            if (res.status !== 200) {
                console.log('Error. There was a problem with loading the image.');
                console.log('Status: ' + res.status);
                return;
            }
            res.json().then((data) => {
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

}); 