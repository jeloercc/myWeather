/* Grab the elements from the HTML */
const navSearch = document.getElementById("nav-search");
const navWeather = document.getElementById("nav-weather");
const searchView = document.getElementById("search-view");
const weatherView = document.getElementById("weather-view");

/* Show the search view, hide the weather view */
function showSearchView() {
  searchView.hidden = false;
  weatherView.hidden = true;
}

/* Show the weather view, hide the search view */
function showWeatherView() {
  searchView.hidden = true;
  weatherView.hidden = false;
}

/* When a nav button is clicked, switch views */
navSearch.addEventListener("click", showSearchView);
navWeather.addEventListener("click", showWeatherView);

/* Search elements */
const searchInput = document.getElementById("search-input");
const searchMessage = document.getElementById("search-message");
const results = document.getElementById("results");

/* API 1 for cities that match the text */
async function searchCities(text) {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    text +
    "&count=5&language=en";

  const response = await fetch(url);
  const data = await response.json();

  console.log("API data:", data);   

  return data.results;
}

/* List of cities on the screen */
function showCities(cities) {
  results.innerHTML = "";
  if (!cities) {
    return;
  }

  for (const city of cities) {
    const li = document.createElement("li");
    li.textContent = city.name + ", " + city.country;

    /* The city is clicked, go show its weather */
    li.addEventListener("click", function () {
      selectCity(city);
    });

    results.appendChild(li);
  }
}

/* The user types, search for cities */
let searchTimer;

searchInput.addEventListener("input", function () {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(async function () {
    const text = searchInput.value.trim();
    const cities = await searchCities(text);
    showCities(cities);
  }, 400);
});

/* Called when the user clicks a city */
async function selectCity(city) {
  showWeatherView();

  const weatherTitle = document.getElementById("weather-title");
  const weatherMessage = document.getElementById("weather-message");

  weatherTitle.textContent = "Weather in " + city.name;
  weatherMessage.textContent = "Loading...";

  const data = await getWeather(city.latitude, city.longitude);

  weatherMessage.textContent = "";
  showWeather(data, city.name);
}

/* API 2 for the weather at these coordinates */
async function getWeather(latitude, longitude) {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current=temperature_2m,weather_code" +
    "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
    "&temperature_unit=fahrenheit" +
    "&timezone=auto&forecast_days=5";
  
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

/* WMO weather code into readable text */
function weatherText(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

/* Draw the weather data on the screen */
function showWeather(data, cityName) {
  const weatherData = document.getElementById("weather-data");

  const current = data.current;
  const daily = data.daily;

  /* Build the current weather block */
  let html =
    '<div class="weather-current">' +
    '<div class="weather-temp">' + current.temperature_2m + "°F</div>" +
    '<div class="weather-condition">' + weatherText(current.weather_code) + "</div>" +
    "</div>";

  /* Build the list of days */
  html += '<div class="weather-days">';

  for (let i = 0; i < daily.time.length; i++) {
    html +=
      '<div class="weather-day">' +
      '<span class="weather-day-name">' + daily.time[i] + "</span>" +
      '<span class="weather-day-info">' +
      weatherText(daily.weather_code[i]) + " · " +
      daily.temperature_2m_min[i] + "°F / " + 
      daily.temperature_2m_max[i] + "°F" +
      "</span>" +
      "</div>";
  }

  html += "</div>";

  weatherData.innerHTML = html;
}

