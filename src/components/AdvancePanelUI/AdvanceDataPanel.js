import { useCallback, useEffect, useState } from "react";
import classes from "./advanceDataPanel.module.css";
import CurrentWeatherDetail from "./CurrentWeatherDetail/CurrentWeatherDetail";
import SevenDayForecast from "./SevenDayForecast/SevenDayForecast";

function AdvancePanel(props) {
  const [isData, setData] = useState(0);
  const [coords, setCoords] = useState({
    lat: 72,
    long: 32,
  });

  // const [latitude, setLatitude] = useState(72);
  // const [longitude, setLongitude] = useState(32);

  const showPosition = useCallback((position) => {
    setCoords({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }, []);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log("Geolocation not supported or disabled.");
    }
  }, [showPosition]);

  const weatherDataFetcher = useCallback(async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&exclude=hourly,minutely&appid=ecf19eb485f5b0d22c414d31ae6a9b14`
    ).then((res) => {
      return res.json();
    });
    setData(data);
  }, [coords]);
  // useEffect(() => {
  //   getLocation();

  //   // weatherFetcher();
  // }, [coords]);
  useEffect(() => {
    getLocation();
    weatherDataFetcher();
    console.log(weatherDataFetcher());
  }, [weatherDataFetcher, getLocation]);

  props.onDataSend(isData);
  return (
    <div className={classes.advancedDataPanel}>
      <CurrentWeatherDetail dataRecieved={isData} />
      <SevenDayForecast dataRecieved={isData} />
    </div>
  );
}

export default AdvancePanel;
// ecf19eb485f5b0d22c414d31ae6a9b14 API Key
