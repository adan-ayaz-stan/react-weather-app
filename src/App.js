import HomePanel from "./components/HomePageUI/HomePanel";
import React, { useState } from "react";
import "animate.css";
import classes from "./App.module.css";
import AdvancePanel from "./components/AdvancePanelUI/AdvanceDataPanel";

export default function App() {
  const [isData, setData] = useState(0);

  const dataTransf = (data) => {
    setData(data);
  };

  return (
    <div
      className={`${classes.mainBody} animate__animated animate__fadeIn animate__delay-1s`}
    >
      <HomePanel onDataRecieve={isData} />
      <AdvancePanel onDataSend={dataTransf} />
      <div className={`${classes.advancedHeading}`}>FORECAST DATA</div>
    </div>
  );
}
