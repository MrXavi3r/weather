/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* global console */
/* global window */
/* global navigator */
/* global fetch */

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");
  const container = document.querySelector(".image");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const key = "ddade6f5bcdab273398ca0ef74325955";
      const query = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${key}`;

      fetch(query)
        .then((response) => response.json())
        .then((data) => {
          const temperature = (data.current.temp - 273.15) * 1.8 + 32;
          const icon = data.current.weather[0].icon;

          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature.toFixed(1);
          temperatureDescription.textContent =
            data.current.weather[0].description;
          locationTimezone.textContent = data.timezone;

          //Formula For Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          container.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          //Change temperature to Celsuis/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        })
        .catch((err) => console.log(err));
    });
  }
});
