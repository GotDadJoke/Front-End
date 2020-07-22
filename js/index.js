const api_url_random = 'https://ckk6y2se8b.execute-api.us-east-1.amazonaws.com/dev/random'
const api_url_search = 'https://ckk6y2se8b.execute-api.us-east-1.amazonaws.com/dev/searchbyterm?term='
var term = 'dog'

function findRandomDadJokes(){

    fetch(api_url_random)
        .then(response => {
            console.log(response); 
            return response.json();
    })
    .then(joke => {
        console.log(joke);
        document.getElementById('jokeLabel').innerHTML = joke.joke;
    })
}

function searchTermDadJokes(){

    fetch(api_url_random+term)
        .then(response => {
            console.log(response); 
            return response.json();
    })
    .then(joke => {
        console.log(joke);
        document.getElementById('jokeLabel').innerHTML = joke.joke;
    })
}
