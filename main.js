// Selecting elements
const cityValue = document.querySelector('#city');
const weatherIcon = document.querySelector('#weatherIcon');
const tempValue = document.querySelector('#tempValue');
const next7DaysEl = document.getElementById('next7days');
const mainDate = document.querySelector('.main-date');

// Weather data
const weather = {};
weather.temperature = {
    unit: 'celcius'
}

function displayNextDay(idx) {
    let today = new Date().getDay() + idx;

    if(today > 6) {
        today = today - 7;
    }

    let out = 
    `<div class="days-box">
        <div class="day">${day[today]}</div>
        <div class="condition-icon">
            <img src="./icons/${weather.daily[idx].weather[0].icon}.png" alt="">
            <p class="condition">${weather.daily[idx].weather[0].description}</p>
        </div>
        <div class="minmax-temp">
            <div class="temp-value-max">
                <p>${Math.floor(weather.daily[idx].temp.max)-KELVIN}°</p>
            </div>
            <div class="temp-value-min">
                <p>${Math.floor(weather.daily[idx].temp.min)-KELVIN}°</p>
            </div>
        </div>
    </div>`;

    if(idx === 0) {
        out = 
        `<div class="days-box">
            <div class="day today">Today</div>
            <div class="condition-icon">
                <img src="./icons/${weather.daily[idx].weather[0].icon}.png" alt="">
                <p class="condition">${weather.daily[idx].weather[0].description}</p>
            </div>
            <div class="minmax-temp">
                <div class="temp-value-max">
                    <p>${Math.floor(weather.daily[idx].temp.max)-KELVIN}°</p>
                </div>
                <div class="temp-value-min">
                    <p>${Math.floor(weather.daily[idx].temp.min)-KELVIN}°</p>
                </div>
            </div>
        </div>`;
    }

    next7DaysEl.innerHTML += out;
}

// Days
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Months
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDayAndDate() {
    let todayDay = new Date().getDay();
    let todayDate = new Date().getDate();
    let whatMonth = new Date().getMonth();
    return `${day[todayDay]}, ${todayDate} ${month[whatMonth]}`;
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
async function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
    let oneApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${APIKEY}`;

    console.log(api);   
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

    fetch(oneApi)
        .then(response => {
            let data = response.json();
            console.log(data);
            return data;
        }).then(data => {
            weather.daily = data.daily;
        })
        .then(function() {
            displayWeather();
        });

        console.log('weather', weather)

}

// Display weather to UI
function displayWeather() {
    mainDate.textContent = `${getDayAndDate()}`;
    cityValue.textContent = `${weather.city}, ${weather.country}`;
    weatherIcon.innerHTML = `<img src="./icons/${weather.iconId}.png" alt="${weather.description}">`;
    tempValue.textContent = `${weather.temperature.value}`;
    // let daily = weather.daily;
    for(let i = 0; i < 7; i++) {
        displayNextDay(i);
    }
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
