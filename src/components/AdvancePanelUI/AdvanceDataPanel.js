import { useEffect, useState } from "react";
import classes from "./advanceDataPanel.module.css";
import CurrentWeatherDetail from "./CurrentWeatherDetail/CurrentWeatherDetail";
import SevenDayForecast from "./SevenDayForecast/SevenDayForecast";

function AdvancePanel(props) {
  const [isData, setData] = useState(1);
  const [stateDataRecieve, setStateDataRecieve] = useState(false);
  const [coords, setCoords] = useState({
    lat: 72,
    long: 32,
  });
  // const [latitude, setLatitude] = useState(72);
  // const [longitude, setLongitude] = useState(32);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log("Geolocation not supported or disabled.");
    }
  };
  const showPosition = (position) => {
    setCoords({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };
  const weatherDataFetcher = async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&exclude=hourly,minutely&appid=ecf19eb485f5b0d22c414d31ae6a9b14`
    )
      .then((res) => {
        setStateDataRecieve(true);
        return res.json();
      })
      .catch((err) => {
        return setStateDataRecieve(false);
      });
    setData(data);
  };

  const weatherFetcher = async () => {
    getLocation();
    weatherDataFetcher();
    // weatherDataFetcher();
  };
  useEffect(() => {
    weatherFetcher();
  }, [coords]);

  return (
    <div className={classes.advancedDataPanel}>
      {stateDataRecieve && <CurrentWeatherDetail dataRecieved={isData} />}
      {stateDataRecieve && <SevenDayForecast dataRecieved={isData} />}
    </div>
  );
}

export default AdvancePanel;
// ecf19eb485f5b0d22c414d31ae6a9b14 API Key
