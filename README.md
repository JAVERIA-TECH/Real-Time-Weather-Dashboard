# Real-Time Weather Dashboard

A responsive weather dashboard that shows live weather conditions and a short forecast for any city, or for your current location, using the OpenWeatherMap API. Built with HTML, CSS and vanilla JavaScript.

## Introduction

Real-Time Weather Dashboard lets users check the weather quickly. On load it asks for location access and shows the weather for where you are. You can also search for any city by name. The page displays current conditions along with a 3-day forecast, and supports both light and dark themes.

## Overview

- Fetches live data from the OpenWeatherMap REST API
- Detects the user's location with the browser Geolocation API
- Shows current weather and a 3-day forecast
- Handles loading, error and "city not found" states
- Works on desktop and mobile screens

## Features

- **Current location weather:** automatically loads weather using browser geolocation
- **City search:** search by city name using the button or the Enter key
- **Current conditions:** temperature (°C), weather description and icon, humidity and wind speed
- **3-day forecast:** date, weather icon and temperature for the next days
- **Dark / light mode:** toggle button in the header
- **User feedback:** clear loading messages and error messages (invalid city, location denied, unsupported browser)
- **Responsive design:** layout adapts to smaller screens with media queries

## Tools and Technologies

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure |
| CSS3 | Styling, CSS variables, Flexbox, responsive layout |
| JavaScript (ES6) | Application logic, DOM updates |
| Fetch API with async/await | Requesting data from the weather API |
| Geolocation API | Getting the user's current position |
| OpenWeatherMap API | Current weather and 5-day / 3-hour forecast data |
| Google Fonts (Roboto) | Typography |
| Git and GitHub | Version control and code hosting |

## Project Architecture

```
Real-Time-Weather-Dashboard/
├── index.html          # Page structure
├── style.css           # Styling, themes and responsive rules
├── script.js           # API calls, geolocation, rendering logic
├── config.example.js   # Template for the API key file
├── .gitignore          # Keeps config.js (your API key) out of Git
└── README.md
```

**How it works**

1. On page load, `script.js` requests the user's location and calls `fetchWeatherByCoords()`.
2. When a city is searched, `fetchWeatherData()` gets the current weather, then uses its coordinates to request the forecast.
3. `displayAllData()` builds the weather card and forecast cards and renders them into the page.
4. The theme toggle switches a `dark-mode` class on the body, and CSS variables change the color palette.

## Getting Started

### Prerequisites

- A modern web browser
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Setup

1. Clone the repository
```bash
   cd Real-Time-Weather-Dashboard
```
2. Create a file named `config.js` in the project folder (copy `config.example.js`) and add your key:
```js
   const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
```
3. Open `index.html` in your browser (or use the VS Code Live Server extension).

> **Security note:** `config.js` is listed in `.gitignore`, so your API key is never committed to the repository. Never share or push your real key.

## Author

**Javeria Fatima**

GitHub: [JAVERIA-TECH](https://github.com/JAVERIA-TECH)