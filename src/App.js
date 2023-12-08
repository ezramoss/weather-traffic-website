import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherPage from "./WeatherPage.js";

function WeatherWebsite() {
  //Main Content
  console.log(process.env.REACT_APP_GOOGLE_KEY)
  return <WeatherPage></WeatherPage>
}

export default WeatherWebsite;