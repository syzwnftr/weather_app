// Selecting elements
const tempValue = document.querySelector('#tempValue');


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
}