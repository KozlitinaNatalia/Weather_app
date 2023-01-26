import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
        <div className="container ">
        <div className="row">
          <div className="col-6">
            <h1>{props.data.city}</h1>
          </div>
          <div className="col-6">
            <WeatherTemperature celsius={props.data.temperature} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <FormattedDate date={props.data.date}/>
          </div>
          <div className="col-6">Humidity: {props.data.humidity}%</div>
        </div>
        <div className="row">
          <div className="col-6">{props.data.description}</div>
          <div className="col-6">Wind: {props.data.wind} km/h</div>
        </div>
        <div className="row">
          <div className="col-6">
            <img src={props.data.icon} alt={props.data.description} />
          </div>
          <div className="col-6"></div>
        </div>
        </div>
        </div>
  );
}


