//function do POST request and gets current rating and number of people rated the joke. Insert it to HTML
function getCurrentRating(id){
    fetch('https://dev-api.gotdadjoke.com/rating/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "id": id,
                "rating": 0
            }),
    })
        .then(function (data) {
            return data.json();
        }).then(ratingBody => {
        let currentRating = document.getElementById('currentRating');
        let totalRatings = document.getElementById('totalRatings');
        currentRating.innerHTML = ratingBody.rating;
        totalRatings.innerHTML = "ratings: " + ratingBody.num_rated;
    })
}

//function do POST request and gets updated rating and number of people rated the joke. Insert it to HTML
function UpdateRating(id, rating){
    fetch('https://dev-api.gotdadjoke.com/rating/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                "id": id,
                "rating": rating
            }),
    })
        .then(function (data) {
            return data.json();
        }).then(ratingBody => {
        let currentRating = document.getElementById('currentRating');
        let totalRatings = document.getElementById('totalRatings');
        currentRating.innerHTML = ratingBody.rating;
        totalRatings.innerHTML = "ratings: " + ratingBody.num_rated;
    })
}