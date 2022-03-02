import { useEffect, useState } from "react";
import classes from "./advanceDataPanel.module.css";
import CurrentWeatherDetail from "./CurrentWeatherDetail/CurrentWeatherDetail";
import LeafletMap from "./LeafletMap/LeafletMap";
import SevenDayForecast from "./SevenDayForecast/SevenDayForecast";

function AdvancePanel() {
  const [isData, setData] = useState(1);
  const [stateDataRecieve, setStateDataRecieve] = useState(false);
  const [latitude, setLatitude] = useState(72);
  const [longitude, setLongitude] = useState(32);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log("Geolocation not supported or disabled.");
    }
  };
  const showPosition = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const weatherDataFetcher = async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=ecf19eb485f5b0d22c414d31ae6a9b14`
    ).then((res) => res.json());
    setData(data);
    setStateDataRecieve(true);
  };

  const weatherFetcher = () => {
    getLocation();
    setTimeout(() => {
      weatherDataFetcher();
    }, 500);
    // weatherDataFetcher();
  };
  useEffect(() => {
    weatherFetcher();
  }, [latitude, longitude]);

  return (
    <div className={classes.advancedDataPanel}>
      {stateDataRecieve && <CurrentWeatherDetail dataRecieved={isData} />}
      {stateDataRecieve && <SevenDayForecast dataRecieved={isData} />}
      {/* <LeafletMap /> */}
    </div>
  );
}

export default AdvancePanel;

// ecf19eb485f5b0d22c414d31ae6a9b14 API Key
