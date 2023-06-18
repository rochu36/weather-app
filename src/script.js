function displaySearchedWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("h2 .temperature-value");
  currentTemperature.innerHTML = temperature;
  let weather = response.data.condition.description;
  let currentWeather = document.querySelector(".current-weather");
  currentWeather.innerHTML = weather;
  let location = response.data.city;
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = location;
}

function displaySearchedCity(event) {
  event.preventDefault();
  let searchedCityInput = document.querySelector("#city-search-input");
  let searchedCity = searchedCityInput.value.trim().toLowerCase();
  let apiKey = "f0f46b64716e36bf140a4af097o93t04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchedWeather);
}

function displayCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDayTime = document.querySelector("#current-day-time");
  currentDayTime.innerHTML = `${day} ${hours}:${minutes}`;
  let updateTime = document.querySelector("#last-updated");
  updateTime.innerHTML = `Last updated ${day}, ${month} ${date}, ${year} at ${hours}:${minutes}`;
}

function displayCurrentWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("h2 .temperature-value");
  currentTemperature.innerHTML = temperature;
  let weather = response.data.condition.description;
  let currentWeather = document.querySelector(".current-weather");
  currentWeather.innerHTML = weather;
  let location = response.data.city;
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = location;
}

function findPosition(position) {
  let apiKey = "f0f46b64716e36bf140a4af097o93t04";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(findPosition);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", displaySearchedCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", searchCurrentLocation);

displayCurrentTime();
