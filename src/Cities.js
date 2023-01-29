import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Cities(props) {
  let [temperature, setTemperature] = useState("");

  function showWeather(response) {
    setTemperature(response.data.main.temp);
  }

  function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  searchCity(props.name);

  return (
    <div className="Cities">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-4">{props.name}</div>
        <div className="col-3">{Math.round(temperature)} °C</div>
      </div>
    </div>
  );
}
