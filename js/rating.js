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
        currentRating.innerHTML = "rating: "+ ratingBody.rating + " people rated: " + ratingBody.num_rated;
    })
}

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
        currentRating.innerHTML = "rating: "+ ratingBody.rating + " people rated: " + ratingBody.num_rated;
    })
}