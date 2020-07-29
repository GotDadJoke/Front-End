
class DisplayState {

    static defaultState() {
        var x = document.getElementById("hidMeWhenSearch");
        var y = document.getElementById("displayMeWhenSearch");
        var z = document.getElementById("searchLabel");
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
    }

    static searchState() {
        var x = document.getElementById("hidMeWhenSearch");
        var y = document.getElementById("displayMeWhenSearch");
        var z = document.getElementById("searchLabel");
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "block";
    }
}

function onLoadThis() {
    SearchJoke.byRandom();
    SearchJoke.byPopularTerms();
}

function searchBtnFunction() {
    DisplayState.searchState();
    SearchJoke.bySearchBoxTerm();
}

function mostPopularBtnFunction(searchterm) {
    console.log(searchterm);
    DisplayState.searchState();
    SearchJoke.byTerm(searchterm);
}

function hiddenRandomJokeBtn() {
    DisplayState.defaultState();
    SearchJoke.byRandom();
}

function handleKeyPress(e){
    var key=e.keyCode || e.which;
    if (key==13){
        searchBtnFunction();
    }
}

