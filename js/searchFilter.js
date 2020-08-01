//
positiveBatch=[]
negativeBatch=[]
mixedBatch=[]
prevTerm = ''
function searchByTermPage(term){
	if(term != prevTerm){
		positiveBatch.length=0;
		negativeBatch.length=0;
		mixedBatch.length=0;
	}
	prevTerm = term; 

	let filterSelection = document.querySelector('input[name=state-d]:checked');
	if (filterSelection!= null ){
  			filterSelection= filterSelection.value;
  		}else{
  			filterSelection= 'off';
  		}
	let limit = 5; 
	let urlTerm =  api_url_term_page+"?term="+term+"&limit="+limit ;
	


	switch(filterSelection){
 		case 'positive':
 			positiveJokesBatch(urlTerm)
 			break;
 		case 'mixed':
 			mixedJokesBatch(urlTerm)
 			break;
 		case 'negative':
 			negativeJokesBatch(urlTerm)
 			break;
 		default:
 			getThoseJokes(urlTerm);
 	}

}



let positiveJokesBatch= (urlTerm)=>{
	
	searchLabel = document.getElementById('searchLabel');
	searchLabel.innerHTML=""



	
	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{
		


		
		if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='NEUTRAL' || obj.sentiment=='POSITIVE'){

		     	positiveBatch.push(obj)
		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		   if (positiveBatch. length<5){
		   keepSearchingJokes(data, urlTerm,'POSITIVE', 1, positiveBatch)
			}		
		   if (positiveBatch. length<5){
		   	keepSearchingJokes(data, urlTerm,'NEUTRAL', 1, positiveBatch)
		   }

		}	
	

	return positiveBatch.map( (jokeObj)=> {
			let emoji = document.createTextNode(sentimentEmoji(`${jokeObj.sentiment}`)),
				br = document.createElement("br"),
				starDiv=document.createElement('div'),
				div= document.createElement('div');
			div.className= 'searchResults';
			starDiv.className = 'starDiv';
			div.innerHTML= `${jokeObj.joke}`;
			div.appendChild(br);
			div.appendChild(emoji);
			div.appendChild(starDiv);
			searchLabel.appendChild(div);
			});	


	})

} 

let negativeJokesBatch= (urlTerm)=>{
	
	searchLabel = document.getElementById('searchLabel');
	searchLabel.innerHTML=""
	
	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{
		
		
		if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='NEGATIVE'){
		     	negativeBatch.push(obj)
		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		    if (negativeBatch. length<5){
		   keepSearchingJokes(data, urlTerm,'NEGATIVE', 1,  negativeBatch)
		   	}
		}	
	

	return negativeBatch.map( (jokeObj)=> {
			let emoji = document.createTextNode(sentimentEmoji(`${jokeObj.sentiment}`)),
				br = document.createElement("br"),
				starDiv=document.createElement('div'),
				div= document.createElement('div');
			div.className= 'searchResults';
			starDiv.className = 'starDiv';
			div.innerHTML= `${jokeObj.joke}`;
			div.appendChild(br);
			div.appendChild(emoji);
			div.appendChild(starDiv);
			searchLabel.appendChild(div);
			});	
	})

} 



let mixedJokesBatch= (urlTerm)=>{
	
	searchLabel = document.getElementById('searchLabel');
	searchLabel.innerHTML=""
	
	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{
		
		
		if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='MIXED'){
		     	mixedBatch.push(obj)
		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		    if (mixedBatch. length<5){
		   keepSearchingJokes(data, urlTerm,'MIXED', 1, mixedBatch)
			}		
		}	
	

	return mixedBatch.map( (jokeObj)=> {
			let emoji = document.createTextNode(sentimentEmoji(`${jokeObj.sentiment}`)),
				br = document.createElement("br"),
				starDiv=document.createElement('div'),
				div= document.createElement('div');
			div.className= 'searchResults';
			starDiv.className = 'starDiv';
			div.innerHTML= `${jokeObj.joke}`;
			div.appendChild(br);
			div.appendChild(emoji);
			div.appendChild(starDiv);
			searchLabel.appendChild(div);
			});	


	})

} 



let keepSearchingJokes=( data, urlTerm, sentiment, page, arr)=>{
	let totalPages = data.total_pages;
	let totalJokes = data.total_jokes;
	 let limit = 5;
	 console.log("we are here  keep searchinh")
	if (page <= totalPages && arr.length < limit){
	
	  let url= urlTerm+"&page="+page;

	  fetch(url)
	  .then((resp)=> resp.json())
	   .then(data =>{
			let jokes = data.results;
			jokes.forEach(obj =>{
		     if (obj.sentiment ==sentiment && arr.length<limit){
		     	arr.push(obj);
		     	 console.log("we are here"+sentiment)
		     }

		 	});
			page++;
		    keepSearchingJokes(data,url, sentiment, page,arr)
		})
	}


}


let getThoseJokes = (urlTerm)=>{

	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{ 
			searchLabel = document.getElementById('searchLabel');
			searchLabel.innerHTML=""
			let jokesArray = data.results;
			return jokesArray.map( (jokeObj)=> {

			let sentiment= 	`${jokeObj.sentiment}`;
			if (sentiment=='POSITIVE' || sentiment=='NEUTRAL'){

					positiveBatch.push(jokeObj);
			}else if (sentiment=="NEGATIVE"){
					negativeBatch.push(jokeObj);
			}else{
					mixedBatch.push(jokeObj);
			}

			let emoji = document.createTextNode(sentimentEmoji(sentiment)),
				br = document.createElement("br"),
				starDiv=document.createElement('div'),
				div= document.createElement('div');
			div.className= 'searchResults';
			starDiv.className = 'starDiv';
			div.innerHTML= `${jokeObj.joke}`;
			div.appendChild(br);
			div.appendChild(emoji);
			div.appendChild(starDiv);
			searchLabel.appendChild(div);
			});						
			}
		)

}







//---------------------------------------------------------------------------------------------------------
//Random Filtered  single joke
//--------------------------------------------------------------------------------------------------------------


cachedrandomDadjokesNeg = []
cachedrandomDadjokesMix = []
cachedrandomDadjokesPos = []
function searchRandomFilter(){


  let filterSelection = document.querySelector('input[name=state-d]:checked');
  if (filterSelection!= null ){
  	filterSelection= filterSelection.value;
  }else{
  	filterSelection= 'off';
  }

 	switch(filterSelection){
 		case 'positive':
 			if (cachedrandomDadjokesPos.length>0){
 				popTheJoke(cachedrandomDadjokesPos)
 			}
 			else{
 				positiveJoke() 
 			}
 			break;
 		case 'mixed':
 			if (cachedrandomDadjokesMix.length>0){
 				popTheJoke(cachedrandomDadjokesMix)
 			}
 			else{
 				mixedJoke() 
 			}
 			break;
 		case 'negative':
 			if (cachedrandomDadjokesNeg.length>0){
 				popTheJoke(cachedrandomDadjokesNeg)
 			}
 			else{
 				negativeJoke() 
 			}
 			break;
 		default:
 			fetch(api_url_random).then(
				response=>{
			 		return response.json()
					}
				).then(data =>{ 
					let jokeLabel = document.getElementById('jokeLabel');
						jokeLabel.innerHTML = data.joke+ '</br>'+sentimentEmoji(data.sentiment);
					}
				)
 	}



}

let popTheJoke = ( jokeArray )=>
{
	let jokeLabel = document.getElementById('jokeLabel');
	let obj = jokeArray.pop()
	jokeLabel.innerHTML = obj.joke + '</br>'+sentimentEmoji(obj.sentiment);
}




let positiveJoke = ()=>{
	fetch(api_url_random).then(
		response=>{
			 return response.json()
			}
		).then(data =>{
			let sentiment =data.sentiment;
			if (data.sentiment=='POSITIVE' || data.sentiment=='NEUTRAL'  ){
				let jokeLabel = document.getElementById('jokeLabel');
				jokeLabel.innerHTML = data.joke + '</br>'+sentimentEmoji(data.sentiment);
			}else{
				if (sentiment == 'NEGATIVE'){
					cachedrandomDadjokesNeg.push(data)
				} else {
					cachedrandomDadjokesMix.push(data)
				}
				positiveJoke()

			}
		}
	)

}


let negativeJoke = ()=>{
	fetch(api_url_random).then(
		response=>{
			 return response.json()
			}
		).then(data =>{
			let sentiment =data.sentiment;
			if (data.sentiment== 'NEGATIVE'  ){
				let jokeLabel = document.getElementById('jokeLabel');
				jokeLabel.innerHTML = data.joke + '</br>'+sentimentEmoji(data.sentiment);
			}else{
				if (sentiment == 'POSITIVE' || sentiment=='NEUTRAL'){
					cachedrandomDadjokesPos.push(data)
				} else {
					cachedrandomDadjokesMix.push(data)
				}
				negativeJoke()

			}
		}
	)

}



let mixedJoke = ()=>{
	fetch(api_url_random).then(
		response=>{
			 return response.json()
			}
		).then(data =>{
			let sentiment =data.sentiment;
			if (data.sentiment== 'MIXED'  ){
				let jokeLabel = document.getElementById('jokeLabel');
				jokeLabel.innerHTML = data.joke + '</br>'+sentimentEmoji(data.sentiment);
			}else{
				if (sentiment == 'POSITIVE' || sentiment=='NEUTRAL'){
					cachedrandomDadjokesPos.push(data)
				} else {
					cachedrandomDadjokesNeg.push(data)
				}
				 mixedJoke()

			}
		}
	)

}

let sentimentEmoji = (sentiment)=>{
	switch(sentiment){
		case 'NEGATIVE' :
				return '😠';
		case 'POSITIVE' : 
		 		return '😃';
		case 'NEUTRAL'  :
				return '😐';
		default :
			return '🙃';
	}		
}