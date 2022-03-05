import 'animate.css';
import classes from "./currentWeatherDetail.module.css";

function CurrentWeatherDetail(props) {
  const data = props.dataRecieved;

  function calculateDate(date) {
    const dateS = new Date(date);
    return (
      `${dateS.getHours()}`.padStart(2, "0") +
      `:` +
      `${dateS.getMinutes()}`.padStart(2, "0")
    );
  }

  if (props.dataRecieved.cod == 429) {
    return <div className={'animate__animated animate__fadeIn animate__fadeIn animate__delay-2s'}>Account Suspended! Check back in an hour!</div>;
  } else if (props.dataRecieved != 0) {
    return (
      <div className={`${classes.detailPanel} animate__animated animate__fadeIn animate__delay-1s`}>
        <div>
          <img
            src={` http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`}
            alt="weather icon"
          ></img>
          <p>Current weather: {data.current.weather[0].main}</p>
          <p>Feels like: {Math.floor(data.current.feels_like - 273.15)}°C</p>
          <p>Pressure: {data.current.pressure} hPA</p>
        </div>
        <div>
          <p>Clouds: {data.current.clouds}%</p>
          <p>Humidity: {data.current.humidity}%</p>
          <p>Sunrise at {calculateDate(data.current.sunrise)} AM</p>
          <p>Sunset at {calculateDate(data.current.sunset)} PM</p>
          {/* <p>Visibility at {data.current.visibility}</p>
        <p>Dew point: {Math.floor(data.current.dew_point - 273.15)}°C</p> */}
          <p>
            Wind: {data.current.wind_speed} metre/sec {data.current.wind_deg}°
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CurrentWeatherDetail;
