const api_url_random = 'https://api.gotdadjoke.com/randomJoke/'
const api_url_search = 'https://api.gotdadjoke.com/searchTerm?term='
const api_url_searchAll = 'https://api.gotdadjoke.com/search'
const api_url_popular = 'https://api.gotdadjoke.com/popular'

//https://cors-anywhere.herokuapp.com/

class SearchJoke {

    static byPopularTerms() {
        fetch(api_url_popular)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(jsonFile => {
                console.log(jsonFile);
                return jsonFile.terms;
            })
            .then(terms => {
                console.log(terms)
                for ( var i = 0; i < terms.length; i++) {
                    var labelName = 'popular' + (i+1);
                    document.getElementById(labelName).innerHTML = terms[i].toUpperCase();
                }
            }) 
    }
    
    static byRandom() {

        var jokeLabel = document.getElementById('jokeLabel');

        fetch(api_url_random)
            .then(response => {
                console.log(response); 
                return response.json();
        })
        .then(joke => {
            console.log(joke);
            jokeLabel.innerHTML = joke.joke + "<br>" + "<br>" + "Sentiment: " + joke.sentiment;
        })
    }

    static byTerm (searchterm) {
        var newApiUrl = api_url_search + searchterm;
        var searchLabel = document.getElementById('searchLabel');
        
        fetch(newApiUrl)
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
    
            searchLabel.innerHTML = "<strong>Results of <strong> '"+ searchterm + "'." + "<br>" + "<br>";
    
            for ( var i = 0; i < results.length; i++) {
                searchLabel.innerHTML 
                 = searchLabel.innerHTML + "<div class='searchResults'>" + results[i].joke + "<br>" + "Sentiment: " + results[i].sentiment + "</div>" + "<br>" + "<br>";
            }
        });
    }

    static bySearchBoxTerm () {
        var searchBoxTerm = document.getElementById("search").value;
        var newApiUrl = api_url_search + searchBoxTerm;
        var searchLabel = document.getElementById('searchLabel');
        
        if(!searchBoxTerm) {
                fetch(api_url_searchAll)
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
        
                searchLabel.innerHTML = "<strong>Here is all of the jokes.<strong>" + "<br>" + "<br>";
        
                for ( var i = 0; i < results.length; i++) {
                    searchLabel.innerHTML 
                    =  searchLabel.innerHTML + "<div class='searchResults'>" + results[i].joke + "<br>" + "Sentiment: " + results[i].sentiment + "</div>" + "<br>" + "<br>";
                }
            });
        } else {
            fetch(newApiUrl)
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
        
                searchLabel.innerHTML = "<strong>Results of <strong> '"+ searchBoxTerm + "'." + "<br>" + "<br>";
        
                for ( var i = 0; i < results.length; i++) {
                    searchLabel.innerHTML 
                    = searchLabel.innerHTML + "<div class='searchResults'>" + results[i].joke + "<br>" + "Sentiment: " + results[i].sentiment + "</div>" + "<br>" + "<br>";
                }
            });
        }
    }
}