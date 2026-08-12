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

/* API for cities that match the text */
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
searchInput.addEventListener("input", async function () {
  const text = searchInput.value.trim();

  const cities = await searchCities(text);
  showCities(cities);
});

/* Called when the user clicks a city */
function selectCity(city) {
  showWeatherView();

  const weatherTitle = document.getElementById("weather-title");
  weatherTitle.textContent = "Weather in " + city.name;

  console.log("Selected city:", city.name, city.latitude, city.longitude);
}