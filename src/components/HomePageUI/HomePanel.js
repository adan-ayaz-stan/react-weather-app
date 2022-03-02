import classes from "./homePanel.module.css";
import image from "../../materials/svgviewer-png-output.png";
import { useRef, useState, useEffect, useCallback } from "react";
import DigitalClock from "./DigitalClock/DigitalClock";

function HomePanel() {
  const initializerValueForUseEffectHookWhichDoesNotChange = 1;
  const [isSlided, setSlided] = useState(false);

  const homePanelRef = useRef();
  const buttonSliderRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      homePanelRef.current.style.left = "0px";
    }, 500);
  }, [initializerValueForUseEffectHookWhichDoesNotChange]);

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
      <img src={image} className={classes.logo}></img>
      <div className={classes.infoBox}>
        <div className={classes.basicTextGray}>It's</div>
        <div className={classes.temperatureText}>32°C</div>
        <div className={classes.basicTextGray}>at</div>
        <div className={classes.locationText}>London, GB</div>
      </div>
      {isSlided || <DigitalClock />}
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
