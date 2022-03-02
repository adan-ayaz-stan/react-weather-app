import { useState } from "react";
import classes from "./sevenDayForecast.module.css";

function SevenDayForecast(props) {
  return (
    <div className={classes.forecastPanel}>
      {props.dataRecieved.daily.map((ele, index) => {
        if (index < 5) {
          return (
            <div key={ele.wind_gust} className={classes.weatherCard}>
              <div className={classes.forecastTemp}>
                <p>{Math.floor(ele.temp.day - 273)}°C</p>
                <p>{Math.floor(ele.temp.night - 273)}°C</p>
                <h5>
                  {index == 0
                    ? "Tomorrow"
                    : `After ${index} day${index == 1 ? "" : "s"}`}
                </h5>
              </div>
              <div className={classes.forecastBrief}>
                <img
                  className={classes.forecastImage}
                  src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`}
                ></img>
                <p>{ele.weather[0].main}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default SevenDayForecast;
