const api_url_random = 'https://api.gotdadjoke.com/randomJoke/'
const api_url_search = 'https://api.gotdadjoke.com/searchTerm?term='
const api_url_searchAll = 'https://api.gotdadjoke.com/search'
const api_url_popular = 'https://api.gotdadjoke.com/popular'
const api_url_term_page = 'https://api.gotdadjoke.com/searchTermPage'
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

        searchRandomFilter();
    }

    static byTerm (searchterm) {
        searchByTermPage(searchterm)
    
    }

    static bySearchBoxTerm () {
        var searchBoxTerm = document.getElementById("search").value;
     
        searchByTermPage(searchBoxTerm );

    }
}