import classes from "./sevenDayForecast.module.css";

function SevenDayForecast(props) {
  if (props.dataRecieved.cod === 429) {
    return null;
  } else if (props.dataRecieved !== 0) {
    return (
      <div className={classes.forecastPanel}>
        {props.dataRecieved.daily.map((ele, index) => {
          return (
            <div key={ele.wind_gust} className={classes.weatherCard}>
              <div className={classes.forecastTemp}>
                <p>{Math.floor(ele.temp.day - 273)}°C</p>
                <p>{Math.floor(ele.temp.night - 273)}°C</p>
                <h5>
                  {index === 0 ? "Tomorrow" : `After ${index * 12} hours`}
                </h5>
              </div>
              <div className={classes.forecastBrief}>
                <img
                  alt="Forecast"
                  className={classes.forecastImage}
                  src={`http://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`}
                ></img>
                <p>{ele.weather[0].main}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default SevenDayForecast;
