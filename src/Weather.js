import React, { useState } from "react";
import "./App.css";
import axios from "axios";
//import ReactAnimatedWeather from "react-animated-weather";

export default function Weather() {
  let [city, setCity] = useState("New York");
  let [weather, setWeather] = useState({});
  let [load, setLoad] = useState(false);

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = 0 + `${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

  function showWeather(response) {
    setLoad(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        className="search"
        placeholder="Type city..."
        onChange={updateCity}
      />
      <button type="submit" className="submit">
        Search
      </button>
    </form>
  );

  if (load) {
    return (
      <div className="Weather">
        {form}
        <div className="container ">
          <div className="row">
            <div className="col-6">
              <h1>{city}</h1>
            </div>
            <div className="col-6">
              <h2>{Math.round(weather.temperature)} °C</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              {days} {hours}:{minutes}
            </div>
            <div className="col-6">Humidity: {weather.humidity}%</div>
          </div>
          <div className="row">
            <div className="col-6">{weather.description}</div>
            <div className="col-6">Wind: {weather.wind} m/h</div>
          </div>
          <div className="row">
            <div className="col-6">
              <img src={weather.icon} alt={weather.description} />
            </div>
            <div className="col-6"></div>
          </div>
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="Weather">{form}</div>;
  }
}
