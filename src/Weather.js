import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Cities from "./Cities";
import ReactAnimatedWeather from "react-animated-weather";

export default function Weather(props) {
  let [city, setCity] = useState(props.city);
  let [weather, setWeather] = useState({});
  let [load, setLoad] = useState(false);

  function time(timestamp) {
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    if (minutes < 10) {
      minutes = 0 + `${minutes}`;
    }
    if (hours < 10) {
      hours = 0 + `${hours}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][timestamp.getDay()];
    return `${days} ${hours}:${minutes}`;
  }

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

  function searchCity(city) {
    if (load === false) {
      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showWeather);
    }
  }

  searchCity(city);

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
      <button type="submit" className="submit">
        Current
      </button>
    </form>
  );

  //   if (load) {
  return (
    <div className="Weather">
      <Cities name="New York" />
      <Cities name="London" />
      <Cities name="Paris" />
      <Cities name="Kyiv" />

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
          <div className="col-6">{time(new Date())}</div>
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
          <div className="col-2">Thu</div>
          <div className="col-2">Fri</div>
          <div className="col-2">Sat</div>
          <div className="col-2">Sun</div>
          <div className="col-2">Mon</div>
          <div className="col-2">Tue</div>
        </div>
        <div className="row">
          <div className="col-2">
            <ReactAnimatedWeather
              icon={"CLEAR_DAY"}
              color={"goldenrod"}
              size={35}
            />
          </div>
          <div className="col-2">
            <ReactAnimatedWeather icon={"FOG"} color={"goldenrod"} size={35} />
          </div>
          <div className="col-2">
            <ReactAnimatedWeather
              icon={"CLEAR_DAY"}
              color={"goldenrod"}
              size={35}
            />
          </div>
          <div className="col-2">
            <ReactAnimatedWeather icon={"RAIN"} color={"goldenrod"} size={35} />
          </div>
          <div className="col-2">
            <ReactAnimatedWeather
              icon={"CLOUDY"}
              color={"goldenrod"}
              size={35}
            />
          </div>
          <div className="col-2">
            <ReactAnimatedWeather
              icon={"PARTLY_CLOUDY_DAY"}
              color={"goldenrod"}
              size={35}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-2">13 °C</div>
          <div className="col-2">14 °C</div>
          <div className="col-2">13 °C</div>
          <div className="col-2">11 °C</div>
          <div className="col-2">9 °C</div>
          <div className="col-2">13 °C</div>
        </div>
      </div>
    </div>
  );
}
