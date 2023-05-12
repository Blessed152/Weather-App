const key = '88bc945a325237a881658018b19ddb8a';

class WEATHER{
	currentWeather(url){
		return  new Promise ((resolve, reject) => {
			fetch(url)
			.then(response => resolve(response.json()))
			.catch(error => reject(error))
		})
	}
} 
document.querySelector('#enter-city').addEventListener('submit', e=> {
e.preventDefault()
cityName = document.querySelector('#city-name').value;
clear()
getWearther = new WEATHER()
getWearther.currentWeather(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&limit=5&units=metric`)
.then(data => getData(data))
.catch(errors => getErrors(errors))
})

function getData(conditions){
	console.log(conditions.sys.country)
	for(const x in conditions){
		const country = conditions.sys.country;
		const city = conditions.name;
		const temperature = conditions.main.temp;
		const weatherDescription = conditions.weather[0].description;
		const mainDescription = conditions.weather[0].main;
		const iconDescription = conditions.weather[0].icon;

		showWeather(country, city,weatherDescription, mainDescription, 
			iconDescription, temperature);
	}
}

function showWeather(country, city, weatherDescription, mainDescription, iconDescription, temperature){

	document.querySelector('#searched-weather').innerHTML = `
	<div class="weather-items">
	<span class ="items">
	${city} (${country})</span> <br> 
	<span class ="items main-description">
	${mainDescription}</span> <br> 
	<span class ="items">
	${weatherDescription}</span> <br> 
	<span class ="items">
	${temperature} <img id ="thermometer" src ="./icons/thermometer.png">
	</span>
</div>`;

	createIcons(mainDescription);
}

function createIcons(weatherStaus){
	let clearSky;
	clearSky = '<img src ="./conditions/sun.png" class = "status-icon">';
    clearSky.className = "iconWeatherStaus";
    let cloudySky;
	cloudySky = '<img src ="./conditions/cloudy.png" class = "status-icon">';
    cloudySky.className = "iconWeatherStaus";

    let rainySky;
    rainySky = '<img src ="./conditions/heavy-rain.png" class = "status-icon">';
    rainySky.className = "iconWeatherStaus";

	const addIcon = document.querySelector('.main-description')
	if(weatherStaus === 'Clear'){
		addIcon.innerHTML += clearSky;
	}else if (weatherStaus === 'Clouds') {
		addIcon.innerHTML += cloudySky;
	}else if (weatherStaus === 'Rain' || 'Rains'){
		addIcon.innerHTML += rainySky;
	}
}


function clear( ){
document.querySelector('#city-name').value = '';
}

/*Errors*/

function getErrors(error){
	console.log(error)
}