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