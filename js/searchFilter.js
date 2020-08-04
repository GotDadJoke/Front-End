//
positiveBatch = new Set() 
negativeBatch= new Set()
mixedBatch= new Set()
prevTerm = ''
let jokeID = "";
function searchByTermPage(term){
	let limit = 5; 
	let urlTerm =  api_url_term_page+"?term="+term+"&limit="+limit ;
	if(term != prevTerm){
		positiveBatch.clear();
		negativeBatch.clear();
		mixedBatch.clear();
		groupJokes( term , urlTerm);
	}
	prevTerm = term; 

	let filterSelection = document.querySelector('input[name=state-d]:checked');
	if (filterSelection!= null ){
  			filterSelection= filterSelection.value;
  		}else{
  			filterSelection= 'off';
  		}

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
		
		/*if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='NEUTRAL' || obj.sentiment=='POSITIVE'){
		     	
		     		positiveBatch.add(obj)

		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		   if (positiveBatch. size<5){
		   keepSearchingJokes(data, urlTerm,'POSITIVE', 1, positiveBatch)
			}		
		   if (positiveBatch. size<5){
		   	keepSearchingJokes(data, urlTerm,'NEUTRAL', 1, positiveBatch)
		   }

		}*/	
	

	return positiveBatch.forEach( (jokeObj)=> {
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
		
		
		/*if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='NEGATIVE'){
		 
		     		negativeBatch.add(obj)  
		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		    if (negativeBatch. size<5){
		   		keepSearchingJokes(data, urlTerm,'NEGATIVE', 1,  negativeBatch)
		   	}
		}*/	
	

	return negativeBatch.forEach( (jokeObj)=> {
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
		
		
		/*if (data.total_jokes <= 5){

			let jokes = data.results;
		    jokes.forEach(obj =>{
		     if (obj.sentiment=='MIXED'){
		     	
		     		mixedBatch.add(obj)
		     }

		 	});
		    }


		else{
		   console.log("More than 5 jokes")
		    if (mixedBatch. size<5){
		   keepSearchingJokes(data, urlTerm,'MIXED', 1, mixedBatch)
			}		
		}	*/
	

	return mixedBatch.forEach( (jokeObj)=> {
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
	if (page <= totalPages && arr.size < limit){
	
	  let url= urlTerm+"&page="+page;

	  fetch(url)
	  .then((resp)=> resp.json())
	   .then(data =>{
			let jokes = data.results;
			jokes.forEach(obj =>{
		     if (obj.sentiment ==sentiment && arr.length<limit){
		     	arr.add(obj);
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

			return jokesArray.forEach( (jokeObj)=> {

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
			}
		)

}
let groupJokes = ( term , urlTerm)=>{
	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{ 
			let jokesArray = data.results;
			let total_jokes = data.total_jokes;
			optimizedJokes(term, total_jokes);
		});
}

let optimizedJokes = ( term , total_jokes )=>{
	let urlTerm =api_url_term_page+"?term="+term+"&limit="+ total_jokes

	fetch(urlTerm)
	.then( (resp) => resp.json()) 
	.then(data =>{ 
			searchLabel = document.getElementById('searchLabel');
			searchLabel.innerHTML=""
			let jokesArray = data.results;
			return jokesArray.forEach( (jokeObj)=> {

			let sentiment= 	`${jokeObj.sentiment}`;
			if ((sentiment=='POSITIVE' || sentiment=='NEUTRAL') && positiveBatch.size<5){
			
					positiveBatch.add(jokeObj);
				
			}else if (sentiment=="NEGATIVE" && negativeBatch.size< 5 ){
				
					negativeBatch.add(jokeObj);
				
			}else{
				if( mixedBatch.size < 5 )
				{
					mixedBatch.add(jokeObj);
				}
			}
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

	//function enable star radio buttons after click
	document.getElementById('rating1').disabled = false;
	document.getElementById('rating2').disabled = false;
	document.getElementById('rating3').disabled = false;
	document.getElementById('rating4').disabled = false;
	document.getElementById('rating5').disabled = false;

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
						jokeLabel.innerHTML = data.joke + '</br>'+sentimentEmoji(data.sentiment);
				// Get Rating
				jokeID = data.id;
				getCurrentRating(jokeID);
			})

			searchByTermPage
	}
}
//onClick functions for rating radio buttons
function clickRating1(){
	UpdateRating(jokeID, 1)
	disableRating();
}

function clickRating2(){
	UpdateRating(jokeID, 2)
	disableRating();
}

function clickRating3(){
	UpdateRating(jokeID, 3)
	disableRating();
}

function clickRating4(){
	UpdateRating(jokeID, 4)
	disableRating();
}
function clickRating5(){
	UpdateRating(jokeID, 5)
	disableRating();
}

//function diables star radio buttons after click
function disableRating(){
	document.getElementById('rating1').disabled = true;
	document.getElementById('rating2').disabled = true;
	document.getElementById('rating3').disabled = true;
	document.getElementById('rating4').disabled = true;
	document.getElementById('rating5').disabled = true;
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
			if (sentiment=='POSITIVE' || sentiment=='NEUTRAL'  ){
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
			if (sentiment== 'MIXED'  || sentiment=='NEUTRAL' ){
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