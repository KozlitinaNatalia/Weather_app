import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
import Cities from "./Cities";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  let [city, setCity] = useState(props.city);
  let [weather, setWeather] = useState({ load: false });
  let cities = ["New York", "London", "Paris", "Kyiv"];

  const codeMapping = {
    "01d": "clear-sky-day",
    "01n": "clear-sky-night",
    "02d": "few-clouds-day",
    "02n": "few-clouds-night",
    "03d": "scattered-clouds-day",
    "03n": "scattered-clouds-night",
    "04d": "broken-clouds-day",
    "04n": "broken-clouds-night",
    "09d": "shower-rain-day",
    "09n": "shower-rain-night",
    "10d": "rain-day",
    "10n": "rain-night",
    "11d": "thunderstorm-day",
    "11n": "thunderstorm-night",
    "13d": "snow-day",
    "13n": "snow-night",
    "50d": "mist-day",
    "50n": "mist-night",
  };

  function showWeather(response) {
    setWeather({
      load: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      city: response.data.name,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
      codeMapping[response.data.weather[0].icon]
    }.png`,
    });
  }

  function searchCity() {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-7">
          <input
            type="search"
            className="form-control"
            placeholder="Type city..."
            onChange={updateCity}
          />
        </div>
        <div className="col-3">
          <button type="submit" className="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  if (weather.load) {
    return (
      <div className="Weather">
        {cities.map(function (city, index) {
          return <Cities key={index} name={city} />;
        })}
        {form}
        <WeatherInfo data={weather} />
        <WeatherForecast coordinates={weather.coordinates} data={weather} />
      </div>
    );
  } else {
    searchCity();
    return "Loading...";
  }
}