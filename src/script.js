function getForecast(city) {
  let apiKey = "f0f46b64716e36bf140a4af097o93t04";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  let humidity = response.data.temperature.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind");
  currentWindSpeed.innerHTML = windSpeed;
  let currentIcon = document.querySelector("#todays-icon");
  currentIcon.setAttribute("src", response.data.condition.icon_url);
  currentIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.city);
}

function displaySearchedCity(searchedCity) {
  let apiKey = "f0f46b64716e36bf140a4af097o93t04";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchedCity}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySearchedWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchedCityInput = document.querySelector("#city-search-input");
  let searchedCity = searchedCityInput.value.trim().toLowerCase();
  displaySearchedCity(searchedCity);
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

  getForecast(response.data.city);
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

function calculateFahrenheit(temperatureValue) {
  temperatureValue.innerHTML = Math.round(
    temperatureValue.textContent * 1.8 + 32
  );
}

function updateFahrenheitLabel(temperatureUnit) {
  temperatureUnit.innerHTML = "°F";
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector(".temperature-unit");
  if (temperatureUnit.textContent === "°C") {
    let temperatureValues = document.querySelectorAll(".temperature-value");
    temperatureValues.forEach(calculateFahrenheit);
    let temperatureUnits = document.querySelectorAll(".temperature-unit");
    temperatureUnits.forEach(updateFahrenheitLabel);
  }
}

function calculateCelsius(temperatureValue) {
  temperatureValue.innerHTML = Math.round(
    (temperatureValue.textContent - 32) / 1.8
  );
}

function updateCelsiusLabel(temperatureUnit) {
  temperatureUnit.innerHTML = "°C";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector(".temperature-unit");
  if (temperatureUnit.textContent === "°F") {
    let temperatureValues = document.querySelectorAll(".temperature-value");
    temperatureValues.forEach(calculateCelsius);
    let temperatureUnits = document.querySelectorAll(".temperature-unit");
    temperatureUnits.forEach(updateCelsiusLabel);
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-5 g-2">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                <div class="card">
                  <div class="card-body">
                    <p class="day-of-week">${formatDay(forecastDay.time)}</p>
                      <img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" class="forecast-icon" />
                    <p class="forecast-high-low">
                      High <span class="temperature-value">${Math.round(
                        forecastDay.temperature.maximum
                      )}</span
                      ><span class="temperature-unit">°C</span>
                      <br />
                      Low <span class="temperature-value">${Math.round(
                        forecastDay.temperature.minimum
                      )}</span
                      ><span class="temperature-unit">°C</span>
                    </p>
                  </div>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", searchCurrentLocation);

let fahrenheitConversion = document.querySelector("#change-to-fahrenheit");
fahrenheitConversion.addEventListener("click", convertToFahrenheit);

let celsiusConversion = document.querySelector("#change-to-celsius");
celsiusConversion.addEventListener("click", convertToCelsius);

displaySearchedCity("Markham");
displayCurrentTime();
