import HomePanel from "./components/HomePageUI/HomePanel";
import React from "react";
import "animate.css";
import classes from "./App.module.css";
import AdvancePanel from "./components/AdvancePanelUI/AdvanceDataPanel";

export default function App() {
  return (
    <div
      className={`${classes.mainBody} animate__animated animate__fadeIn animate__delay-1s`}
    >
      <HomePanel />
      <AdvancePanel />
      <div className={`${classes.advancedHeading}`}>FORECAST DATA</div>
    </div>
  );
}
