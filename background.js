// listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {

    if (msg.name == "fetchJoke") {
        
        // call api
        fetch('https://api.jokes.one/jod').then(function(res) {
            // wait for response
            if (res.status !== 200) {
                response({title: 'Error', text: 'There was a problem loading the joke of the day.'})
                return;
            }
            res.json().then(function(data) {
                // send response
                response({title: data.contents.jokes[0].joke.title, text: data.contents.jokes[0].joke.text})
            });
        }).catch(function(err) {
            response({title: 'Error', text: 'There was a problem loading the joke of the day.'})
        });

    }

    return true;

})
// const callJokeAPI = async () => {
//     let jokeData = await fetch('https://api.jokes.one/jod');
//     let jokeJson = await jokeData.json();
//     return jokeJson;
// }

// const getJokeText = async() => {
//     let jsonData = await callJokeAPI();
//     let text = jsonData.contents.jokes[0].joke.text;
//     console.log(text);
//     return text;
// }

// const getJokeTitle = async() => {
//     let jsonData = await callJokeAPI();
//     let title = jsonData.contents.jokes[0].joke.title;
//     console.log(title);
//     return title;
// }

// function callJokeAPI() {
//     return fetch('https://api.jokes.one/jod')
//     .then(
//         function(response) {
//                 if (response.status !== 200) {
//                     console.log('Error. Status Code: ' + response.status);
//                     return;
//                 }

//                 // examine text in response
//                 return response.json().then(function(data) {
//                     // console.log(data.contents.jokes[0].joke.text);
//                     // jokeText = data.contents.jokes[0].joke.text;
//                     // jokeTitle = data.contents.jokes[0].joke.title;
//                     return data;
//                 });
//             }
//         )
//     .catch(function(err) {
//         console.log('Fetch Error:-S', err);
//     });
// }