import HomePanel from "./components/HomePageUI/HomePanel";

import React from "react";
import classes from "./App.module.css";
import AdvancePanel from "./components/AdvancePanelUI/AdvanceDataPanel";

export default function App() {
  return (
    <div className={classes.mainBody}>
      <HomePanel />
      <AdvancePanel />
      <div className={classes.advancedHeading}>ADVANCED DATA</div>
    </div>
  );
}
