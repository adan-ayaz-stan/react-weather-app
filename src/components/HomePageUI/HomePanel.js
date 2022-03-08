import classes from "./homePanel.module.css";
import image from "../../materials/svgviewer-png-output.png";
import "animate.css";
import { useRef, useState, useEffect, useCallback } from "react";
import DigitalClock from "./DigitalClock/DigitalClock";

function HomePanel(props) {
  const [isSlided, setSlided] = useState(false);
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
  }, [weatherDataFetcher, getLocation]);

  // const weatherDataFetcher = async () => {
  //   const data = await fetch(
  //     `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&exclude=hourly,minutely&appid=ecf19eb485f5b0d22c414d31ae6a9b14`
  //   ).then((res) => {
  //     return res.json();
  //   });
  //   setData(data);
  // };

  // useEffect(() => {
  //   getLocation();
  //   weatherDataFetcher();
  // }, []);

  const homePanelRef = useRef();
  const buttonSliderRef = useRef();

  useEffect(() => {
    homePanelRef.current.style.left = "0px";
  }, []);

  const buttonClickHandlerNotSlidedMemoized = useCallback(() => {
    homePanelRef.current.style.left = "-74.30%";
    setSlided(true);
  }, []);
  const buttonClickHandlerSlidedMemoized = useCallback(() => {
    homePanelRef.current.style.left = "0px";
    setSlided(false);
  }, []);

  const buttonHoverHandlerSlidedMemoized = useCallback(() => {
    buttonSliderRef.current.style.backgroundColor = "#11121f";
    buttonSliderRef.current.style.outline = "solid 1px wheat";
  }, []);
  const buttonHoverHandlerNotSlidedMemoized = useCallback(() => {
    buttonSliderRef.current.style.transform =
      "rotateY(180deg) translateY(-50%) perspective(500px)";
    buttonSliderRef.current.style.backgroundColor = "#11121f";
    buttonSliderRef.current.style.outline = "solid 1px wheat";
  }, []);

  const buttonHoverHandlerLeaveMemoized = useCallback((e) => {
    e.preventDefault();
    buttonSliderRef.current.style.transform =
      "rotate(0deg) translateY(-50%) perspective(500px)";
    buttonSliderRef.current.style.backgroundColor = "#6c2aaf";
    buttonSliderRef.current.style.outline = "none";
  }, []);

  return (
    <div className={classes.homePanel} ref={homePanelRef}>
      <div className={classes.clippy}>clippy</div>
      <img src={image} alt="logo" className={classes.logo}></img>
      <div
        className={`${classes.infoBox} animate__animated animate__fadeIn animate__fadeIn animate__delay-2s`}
      >
        {isData.cod === 429 ? (
          <div
            className={
              "animate__animated animate__fadeIn animate__fadeIn animate__delay-2s"
            }
          >
            Account suspended! Check back in an hour!
          </div>
        ) : (
          <>
            <div className={classes.basicTextGray}>It's</div>
            <div className={classes.temperatureText}>
              {isData ? Math.floor(isData.current.temp - 273.15) : "32°C"}
            </div>
            <div className={classes.basicTextGray}>at</div>
            <div className={classes.locationText}>
              {isData ? isData.timezone : "London/GB"}
            </div>
          </>
        )}
      </div>
      {<DigitalClock />}
      <button
        className={classes.buttonSlider}
        onClick={
          isSlided
            ? buttonClickHandlerSlidedMemoized
            : buttonClickHandlerNotSlidedMemoized
        }
        onMouseOver={
          isSlided
            ? buttonHoverHandlerSlidedMemoized
            : buttonHoverHandlerNotSlidedMemoized
        }
        onMouseLeave={buttonHoverHandlerLeaveMemoized}
        ref={buttonSliderRef}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
        </svg>
      </button>
    </div>
  );
}

export default HomePanel;
