// Selecting elements
const cityValue = document.querySelector('#city p');
const weatherIcon = document.querySelector('#weatherIcon');
const tempValue = document.querySelector('#tempValue p');
const tempMax = document.querySelector('#tempMax');
const tempMin = document.querySelector('#tempMin');
const tempCondition = document.querySelector('.temp-condition p')

// Weather data
const weather = {};
weather.temperature = {
    unit: 'celcius'
}


// App constant / API key
const KELVIN = 273;
const APIKEY = '103d3d4b3d903aa40993ccfd11a6e67f';

// Check if browser support geolocation
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition);
} // STILL NEED TO PROVIDE ERROR ELEMENT


// Set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Get weather from API provider
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
    
    console.log(api);

    fetch(api)
        .then(response => {
            let data = response.json();
            return data;
        })
        .then(data => {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.temperature.min = Math.floor(data.main.temp_min - KELVIN);
            weather.temperature.max = Math.floor(data.main.temp_max - KELVIN);

            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;

            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

// Display weather to UI
function displayWeather() {
    cityValue.textContent = `${weather.city}, ${weather.country}`;
    weatherIcon.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="">`;
    tempValue.textContent = `${weather.temperature.value}°`;
    // tempCondition.textContent = `${weather.description}`;
    tempMax.textContent = `${weather.temperature.max}°`;
    tempMin.textContent = `${weather.temperature.min}°`;
}