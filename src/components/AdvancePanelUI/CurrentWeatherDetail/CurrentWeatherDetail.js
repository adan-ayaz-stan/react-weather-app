import classes from "./currentWeatherDetail.module.css";

function CurrentWeatherDetail(props) {
  const data = props.dataRecieved;
  const temp = Math.floor(data.current.feels_like - 273.15);

  console.log(data);
  return (
    <div className={classes.detailPanel}>
      <img
        src={` http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
      ></img>
      <p>Current weather: {data.current.weather[0].main}</p>
      <p>Feels like: {temp}°C</p>
      <p>Pressure: {data.current.pressure} hPA</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>
        Wind: {data.current.wind_speed} metre/sec {data.current.wind_deg}°
      </p>
    </div>
  );
}

export default CurrentWeatherDetail;
