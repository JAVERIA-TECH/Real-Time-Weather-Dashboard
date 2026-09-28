
const apiKey = 'YOUR_NEW_KEY_HERE';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const modeToggle = document.getElementById('mode-toggle');
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    modeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
});

async function fetchWeatherData(cityName) {
    try {
        weatherInfo.innerHTML = '<p class="loading-state">Fetching weather data...</p>';

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
            throw new Error('City not found!');
        }

        const currentWeatherData = await weatherResponse.json();
        
        const lat = currentWeatherData.coord.lat;
        const lon = currentWeatherData.coord.lon;

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayAllData(currentWeatherData, forecastData);

    } catch (error) {
        weatherInfo.innerHTML = `<p class="error-state">${error.message}</p>`;
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const currentWeatherData = await weatherResponse.json();

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayAllData(currentWeatherData, forecastData);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error-state">Could not fetch weather data for your location.</p>`;
    }
}

function displayAllData(currentData, forecastData) {
    const currentWeatherHTML = `
        <div class="weather-card">
            <h2>${currentData.name}, ${currentData.sys.country}</h2>
            <div class="main-info">
                <img src="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" alt="${currentData.weather[0].description}">
                <p class="temperature">${Math.round(currentData.main.temp)}°C</p>
            </div>
            <p class="description">${currentData.weather[0].description}</p>
            <div class="details">
                <p>Humidity: ${currentData.main.humidity}%</p>
                <p>Wind Speed: ${currentData.wind.speed} m/s</p>
            </div>
        </div>
    `;

    let forecastHTML = '<div class="forecast-container"><h3>3-Day Forecast</h3><div class="forecast-cards">';
    const uniqueDates = new Set();
    const dailyForecasts = forecastData.list.filter(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!uniqueDates.has(date) && uniqueDates.size < 3) {
            uniqueDates.add(date);
            return true;
        }
        return false;
    });

    dailyForecasts.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        forecastHTML += `
            <div class="forecast-day">
                <p class="date">${date}</p>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                <p class="temp">${Math.round(item.main.temp)}°C</p>
            </div>
        `;
    });
    
    forecastHTML += '</div></div>';

    weatherInfo.innerHTML = currentWeatherHTML + forecastHTML;
}

function getCurrentLocationWeather() {
    if ("geolocation" in navigator) {
        weatherInfo.innerHTML = '<p class="loading-state">Finding your location...</p>';
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        }, error => {
            weatherInfo.innerHTML = `<p class="error-state">Geolocation failed. Please enter a city manually.</p>`;
        });
    } else {
        weatherInfo.innerHTML = `<p class="error-state">Geolocation is not supported by your browser.</p>`;
    }
}
document.addEventListener('DOMContentLoaded', getCurrentLocationWeather);
