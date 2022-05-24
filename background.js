let endpoint = 'https://api.jokes.one/jod';
let collection_param = '';

function getRandomNumber(number) {
    let max = number + 1;
    return Math.floor(Math.random() * Math.floor(max));
}

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
                // default images in case Unsplash image cannot load

                const imagesSrc = [
                    'https://images.unsplash.com/photo-1461696114087-397271a7aedc?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940',
                    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
                    'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471',
                    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470'
                ];

                const imagesLink = [
                    'https://unsplash.com/photos/AkUR27wtaxs',
                    'https://unsplash.com/photos/zAjdgNXsMeg',
                    'https://unsplash.com/photos/cXU6tNxhub0',
                    'https://unsplash.com/photos/CSpjU6hYo_0'
                ];

                const creatorsText = [
                    'Anders Jildén',
                    'Luca Bravo',
                    'Andre Benz',
                    'Cristina Gottardi'
                ];

                const creatorsLink = [
                    'https://unsplash.com/@andersjilden',
                    'https://unsplash.com/@lucabravo',
                    'https://unsplash.com/@trapnation',
                    'https://unsplash.com/@cristina_gottardi'
                ];
                
                let num = getRandomNumber(3);
                response({imageSrc: imagesSrc[num], imageLink: imagesLink[num], creatorText: creatorsText[num], creatorLink: creatorsLink[num]})
                return;
            }
            res.json().then((data) => {
                let imageElementSrc = data.urls.regular;
                let imageLinkAttribute = data.links.html;
                let creatorInnerText = data.user.name;
                let creatorLinkAttribute = data.user.portfolio_url;
                if (creatorLinkAttribute == null) {
                    
                } 
                response({imageSrc: imageElementSrc, imageLink: imageLinkAttribute, creatorText: creatorInnerText, creatorLink: creatorLinkAttribute })
            });
        }).catch((err) => {
            console.log("Error: " + err)
            return;
        });
            
    }

    return true;

}); 