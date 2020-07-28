//https://api.gotdadjoke.com/search


const api_url_random = 'https://api.gotdadjoke.com/randomJoke//'
const api_url_search = 'https://api.gotdadjoke.com/searchTerm?term='
//https://cors-anywhere.herokuapp.com/

function findRandomDadJokes(){

    fetch(api_url_random)
        .then(response => {
            console.log(response); 
            return response.json();
    })
    .then(joke => {
        console.log(joke);
        document.getElementById('jokeLabel').innerHTML = joke.joke + "<br>" + "<br>" + "Sentiment: " + joke.sentiment;
    })
}

function searchTermDadJokes(){

    var searchTerm = document.getElementById("search").value;
    var newAPI = api_url_search + searchTerm;
    
    fetch(newAPI)
        .then(response => {
            console.log(response);
            return response.json();
    })
    .then(jsonFile => {
        console.log(jsonFile);
        return jsonFile.results;
    })
    .then(results => { //results = shold be array of jokes
        console.log(results);

        document.getElementById('searchLabel').innerHTML = "<strong>Results of <strong> '"+ searchTerm + "'." + "<br>" + "<br>";

        for ( var i = 0; i < results.length; i++) {
            document.getElementById('searchLabel').innerHTML 
             = document.getElementById('searchLabel').innerHTML + " " + results[i].joke + "<br>" + "<div class='test' >Sentiment: </div>" + results[i].sentiment + "<br>" + "<br>";
        }
    });
}

function hidOrDisplayWhenSearch() {
    var x = document.getElementById("hidMeWhenSearch");
    var y = document.getElementById("displayMeWhenSearch");
    var z = document.getElementById("searchLabel");
    x.style.display = "none";
    y.style.display = "block";
    z.style.display = "block";
}

function reverseHidOrDisplayWhenSearch() {
    var x = document.getElementById("hidMeWhenSearch");
    var y = document.getElementById("displayMeWhenSearch");
    var z = document.getElementById("searchLabel");
    x.style.display = "block";
    y.style.display = "none";
    z.style.display = "none";
}

function searchBtnFunction() {
    hidOrDisplayWhenSearch();
    searchTermDadJokes();
}

function hiddenRandomJokeBtn() {
    reverseHidOrDisplayWhenSearch();
    findRandomDadJokes();
}

function handleKeyPress(e){
    var key=e.keyCode || e.which;
    if (key==13){
        searchBtnFunction();
    }
}

