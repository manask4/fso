import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather({ city }) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`
      )
      .then(({ data }) => {
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const sky = data.weather[0].description;
        const icon = data.weather[0].icon;
        setWeatherData({ temp, humidity, wind, sky, icon });
      });
  }, [city, API_KEY]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {Object.keys(weatherData).length && (
        <>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="weather-label">Temperature</label>
            <span>{weatherData.temp} Celcius</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="weather-label">Humidity</label>
            <span>{weatherData.humidity}%</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="weather-label">Wind</label>
            <span>{weatherData.wind} km/h</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              className="weather-icon"
              alt="weather icon"
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
