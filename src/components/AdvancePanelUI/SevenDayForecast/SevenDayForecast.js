import classes from "./sevenDayForecast.module.css";

function SevenDayForecast(props) {
  return (
    <div className={classes.forecastPanel}>
      Forecast 7 days
      {props.dataRecieved.daily.map((ele) => {
        return (
          <div className={classes.weatherCard}>
            <div className={classes.box}>
              <p>{ele.temp.day}</p>
              <p>{ele.temp.eve}</p>
            </div>
            <div className={classes.box}>
              <p>{ele.temp.max}</p>
              <p>{ele.temp.min}</p>
            </div>
            <div className={classes.box}>
              <p>{ele.temp.morn}</p>
              <p>{ele.temp.night}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SevenDayForecast;
