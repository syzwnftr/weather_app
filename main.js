// Selecting elements
const cityValue = document.querySelector('#city');
const weatherIcon = document.querySelector('#weatherIcon');
const tempValue = document.querySelector('#tempValue');
// const tempMax = document.querySelector('#tempMax');
// const tempMin = document.querySelector('#tempMin');
// const lowHighTemp = document.querySelector('#lowHighTemp');
// const tempCondition = document.querySelector('.temp-condition p');

// Weather data
const weather = {};
weather.temperature = {
    unit: 'celcius'
}

// Day
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
    let oneApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely&appid=${APIKEY}`;

    
    console.log(oneApi);

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
    weatherIcon.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="${weather.description}">`;
    tempValue.textContent = `${weather.temperature.value}`;
    // tempCondition.textContent = `${weather.description}`;
    // tempMax.textContent = `${weather.temperature.max}°`;
    // tempMin.textContent = `${weather.temperature.min}°`;
    // lowHighTemp.textContent = `${weather.temperature.min}°-${weather.temperature.max}°`;
}


// Chart.js 
const labels = ['10AM', '12 PM', '2PM', '4PM', '6PM'];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Chance of rain(%)',
      backgroundColor: '#e7ce60',
      borderColor: '#e7ce60',
      data: [7, 12, 10, 30, 40],
      tension: 0.4
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#525274',
                    maxTicksLimit: 3,
                    callback: ((context, index) => {
                        let response;
                        if(context >= 40) {
                            response = 'High';
                        } else if(context >= 20) {
                            response = 'Medium';
                        } else {
                            response = 'Low';
                        }

                        return response;
                    })
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    color: '#525274'
                }
            }
        }
    }
  };

  const myChart = new Chart(document.getElementById('myChart'), config);
