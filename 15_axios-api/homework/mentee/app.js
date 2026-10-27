// ============================================================
// 🏠  AXIOS — HOMEWORK
// ============================================================
// Mini Project: Weather Dashboard
//
// The SAME project as the fetch homework — same HTML, same
// CSS, same DOM. Your job here is to rebuild the request logic
// with axios + async/await, then compare the two app.js files.
//
// API: https://api.open-meteo.com/v1/forecast
// Params: latitude, longitude, current_weather=true
//
// KEY DIFFERENCES FROM FETCH — watch for them as you build:
//   1. axios parses JSON for you — response.data, no .json() call
//   2. axios REJECTS the promise on a bad status automatically —
//      no response.ok check needed
//   3. async/await + try/catch replaces .then/.catch/.finally
// ============================================================

// ============================================================
// CITY DATA — coordinates for each city in the dropdown
// ============================================================
const CITIES = {
  "new-york": { name: "New York", lat: 40.71, lon: -74.01 },
  london: { name: "London", lat: 51.51, lon: -0.13 },
  tokyo: { name: "Tokyo", lat: 35.68, lon: 139.69 },
  sydney: { name: "Sydney", lat: -33.87, lon: 151.21 },
  paris: { name: "Paris", lat: 48.85, lon: 2.35 },
  dubai: { name: "Dubai", lat: 25.2, lon: 55.27 },
};

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

// ============================================================
// WEATHER CODE HELPER
// ============================================================
// Open-Meteo uses WMO weather codes. This function converts
// a code to a human-readable label and emoji. (Unchanged from
// the fetch version — pure logic, no network code.)
function getWeatherDescription(code) {
  if (code === 0) {
    return { label: "Clear sky", icon: "☀️" };
  }
  if (code >= 1 && code <= 3) {
    return { label: "Partly cloudy", icon: "⛅" };
  }
  if (code >= 45 && code <= 48) {
    return { label: "Foggy", icon: "🌫️" };
  }
  if (code >= 51 && code <= 67) {
    return { label: "Rain", icon: "🌧️" };
  }
  if (code >= 71 && code <= 77) {
    return { label: "Snow", icon: "❄️" };
  }
  if (code >= 80 && code <= 82) {
    return { label: "Rain showers", icon: "🌦️" };
  }
  if (code >= 95 && code <= 99) {
    return { label: "Thunderstorm", icon: "⛈️" };
  }
  return { label: "Unknown", icon: "🌡️" };
}

// ----------------------------------------------------------
// TASK 1 — safeFetch helper (axios rebuild)
// ----------------------------------------------------------
// Declare an ASYNC function called safeFetch.
// Parameter: url (string)
//
// Inside:
//   1. const response = await axios.get(url)
//   2. return response.data
//
// ⚠️ Compare this to the fetch version's safeFetch. That one
//    needed a response.ok check AND a response.json() call —
//    axios does both automatically. This function is almost
//    embarrassingly short. That's not a mistake — write a
//    comment explaining why you kept the wrapper anyway.

function safeFetch(url) {
  // your code here
}

// ----------------------------------------------------------
// TASK 2 — DOM helpers (unchanged from fetch)
// ----------------------------------------------------------
// These are pure DOM manipulation — copy them straight from
// your fetch version, no changes needed:
//
// getEl(id)           → document.getElementById(id)
// showSpinner(msg)    → remove "hidden" from #loading-spinner
//                       set #loading-message textContent to msg
// hideSpinner()       → add "hidden" to #loading-spinner
// showError(msg)      → remove "hidden" from #error-box
//                       set #error-message textContent to msg
// hideError()         → add "hidden" to #error-box
// showStatus(msg, type) → TWO writes: #status-bar's className to
//                       "status-bar " + (type || ""), AND the
//                       CHILD #status-message's textContent to msg
// hideStatus()        → add "hidden" to #status-bar

function getEl(id) {
  return document.getElementById(id);
}

function showSpinner(msg) {
  // your code here (same as fetch version)
}

function hideSpinner() {
  // your code here (same as fetch version)
}

function showError(msg) {
  // your code here (same as fetch version)
}

function hideError() {
  // your code here (same as fetch version)
}

function showStatus(msg, type) {
  // your code here (same as fetch version)
}

function hideStatus() {
  // your code here (same as fetch version)
}

// ----------------------------------------------------------
// TASK 3 — buildWeatherUrl (unchanged from fetch)
// ----------------------------------------------------------
// Declare a function called buildWeatherUrl.
// Parameter: city (object with lat, lon properties)
//
// Returns the full API URL with query parameters — building a
// query string has nothing to do with which library eventually
// sends the request, so this is identical to the fetch version:
//   WEATHER_API + "?latitude=" + city.lat
//              + "&longitude=" + city.lon
//              + "&current_weather=true"

function buildWeatherUrl(city) {
  // your code here (same as fetch version)
}

// Test it:
// console.log(buildWeatherUrl(CITIES["london"]));
// Expected: "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current_weather=true"

// ----------------------------------------------------------
// TASK 4 — createWeatherCard (unchanged from fetch)
// ----------------------------------------------------------
// Declare a function called createWeatherCard.
// Parameters: cityName (string), data (parsed API response)
//
// This function renders an already-parsed `data` object — it
// never knows or cares whether that object arrived via
// response.json() or response.data. Copy it straight from your
// fetch version.
//
// The weather data lives at data.current_weather:
//   data.current_weather.temperature   → number (°C)
//   data.current_weather.windspeed     → number (km/h)
//   data.current_weather.winddirection → number (degrees)
//   data.current_weather.weathercode   → number (WMO code)
//
// Build and return a <div class="weather-card"> containing:
//   1. <p class="city-name"> → cityName
//   2. <p class="coord-text"> → "Lat: " + lat + " | Lon: " + lon
//      (from data.latitude and data.longitude)
//   3. <span class="weather-icon"> → getWeatherDescription(code).icon
//   4. <p class="temperature"> → temperature + "°C"
//   5. <p class="condition"> → getWeatherDescription(code).label
//   6. A <div class="weather-stats"> containing two stat divs:
//      Wind speed: windspeed + " km/h"
//      Wind dir:   winddirection + "°"
//
// Return the card.

function createWeatherCard(cityName, data) {
  // your code here (same as fetch version)
}

// ----------------------------------------------------------
// TASK 5 — fetchWeatherForCity (axios rebuild)
// ----------------------------------------------------------
// Declare an ASYNC function called fetchWeatherForCity.
// Parameter: cityKey (string — the key in CITIES object)
//
// Inside:
//   1. Get the city object: CITIES[cityKey]
//   2. If no city found → showError("City not found") and return
//   3. Show a temporary loading card in the grid (same as fetch
//      version — create a <div class="card-loading">, append it)
//   4. Build the URL: buildWeatherUrl(city)
//   5. Inside a try block:
//      const data = await safeFetch(url)
//      Remove the loading card: document.getElementById("loading-" + cityKey)?.remove()
//      Build the real card: createWeatherCard(city.name, data)
//      Append it to #weather-grid
//   6. In the catch block:
//      Remove the loading card
//      ⚠️ axios errors carry the status at err.response.status —
//         but ONLY when the server actually answered. A true
//         network failure (no wifi) has NO err.response at all,
//         so reading err.response.status directly would crash.
//         Guard with && first:
//      IF err.response →
//        showError("Failed to fetch " + city.name + ": HTTP " + err.response.status)
//      ELSE →
//        showError("Failed to fetch " + city.name + ": " + err.message)

function fetchWeatherForCity(cityKey) {
  // your code here
}

// ----------------------------------------------------------
// TASK 6 — handleFetchWeather (unchanged from fetch)
// ----------------------------------------------------------
// Declare a function called handleFetchWeather.
//
// Inside:
//   1. Get the selected city key from #city-select
//   2. If empty → showError("Please select a city") and return
//   3. hideError()
//   4. Call fetchWeatherForCity(cityKey)
//      (Notice: fetchWeatherForCity is now async, but you don't
//       await it here — you fire it and move on, same as before.
//       Nothing in this function needs to wait for the network.)
//
// Wire it up:
//   document.getElementById("fetch-weather-btn")
//     .addEventListener("click", handleFetchWeather)

function handleFetchWeather() {
  // your code here (same as fetch version)
}

document
  .getElementById("fetch-weather-btn")
  .addEventListener("click", handleFetchWeather);

// ----------------------------------------------------------
// TASK 7 — fetchAllCities (unchanged from fetch)
// ----------------------------------------------------------
// Declare a function called fetchAllCities.
//
// Inside:
//   1. Clear the grid: getEl("weather-grid").innerHTML = ""
//   2. hideError()
//   3. showStatus("🌍 Fetching all cities...", "")
//   4. Get all city keys: Object.keys(CITIES)
//   5. For each key, call fetchWeatherForCity(key)
//      (Six independent async calls, none of them awaited here —
//       same "fire six, don't wait" behavior as the fetch version.)
//   6. showStatus("✅ Requests sent for all cities", "success")
//      ⚠️ Same caveat as the fetch version: this status shows
//      immediately, before any card has actually loaded.
//
// Wire it up:
//   document.getElementById("fetch-all-btn")
//     .addEventListener("click", fetchAllCities)

function fetchAllCities() {
  // your code here (same as fetch version)
}

document
  .getElementById("fetch-all-btn")
  .addEventListener("click", fetchAllCities);

// ----------------------------------------------------------
// TASK 8 — clear all (unchanged from fetch)
// ----------------------------------------------------------
// Wire up #clear-btn:
//   - Clear the grid
//   - hideError(), hideStatus()
//   - Reset #city-select to ""

document.getElementById("clear-btn").addEventListener("click", function () {
  // your code here (same as fetch version)
});

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — Promise.all with async/await
// ----------------------------------------------------------
// Rebuild fetchAllCitiesParallel from the fetch version with
// async/await. Promise.all doesn't care which library produced
// the promises inside it — it only understands promises, so it
// works identically here.
//
// Declare an ASYNC function called fetchAllCitiesParallel.
//
// Inside:
//   1. Clear the grid
//   2. showSpinner("Fetching all cities...")
//   3. Build an array of promises — map each city key to an
//      ASYNC arrow/function that awaits safeFetch and returns
//      { key, data }:
//      const promises = Object.keys(CITIES).map(async function(key) {
//        const data = await safeFetch(buildWeatherUrl(CITIES[key]));
//        return { key, data };
//      });
//   4. Inside a try block:
//      const results = await Promise.all(promises)
//      results.forEach(function(result) {
//        const city = CITIES[result.key];
//        const card = createWeatherCard(city.name, result.data);
//        getEl("weather-grid").appendChild(card);
//      });
//      showStatus("✅ All " + results.length + " cities loaded", "success")
//   5. catch (err) → showError("One or more cities failed: " + err.message)
//   6. finally → hideSpinner()
//
// Write a comment: does Promise.all itself know or care that
// you're using axios instead of fetch?

function fetchAllCitiesParallel() {
  // your code here
}
