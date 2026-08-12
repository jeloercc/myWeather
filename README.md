# Weather Anywhere

This is a simple weather app that I made using HTML, CSS and JavaScript.
It uses the Open-Meteo API to search for a city and show its weather.

## What it does

- You can search for a city by typing its name.
- When you click on a city, it shows the current weather and the forecast for the next 5 days.
- You can switch between the search view and the weather view using the buttons at the top.

## APIs used

I used two endpoints from Open-Meteo (no API key needed):

- Geocoding API - to search for cities by name.
- Forecast API - to get the weather for the city you pick.

## How to run it

1. Download or clone this repo.
2. Open the `index.html` file in your browser (just double click it).

That's it! No installation needed.

## Files

- `index.html` - the structure of the page.
- `index.css` - the styles.
- `index.js` - the JavaScript that calls the API and shows the data.

## Notes

The temperature is shown in Fahrenheit.