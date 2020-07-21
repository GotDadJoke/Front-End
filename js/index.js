const api_url = 'https://dev-api.gotdadjoke.com/random'
console.log(api_url);
function findDadJokes(){

    fetch(api_url, { method: "get"})
    .then(data => {return data.text()})
    .then(res => {
        document.getElementById('jokeLabelBtn').innerHTML = res 
        console.log(res)})

}
