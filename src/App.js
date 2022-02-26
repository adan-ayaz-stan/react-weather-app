import HomePanel from "./components/HomePageUI/HomePanel";

import React from "react";
import classes from "./App.module.css";

export default function App() {
  return (
    <div className={classes.mainBody}>
      <HomePanel />
      <div className={classes.advancedHeading}>ADVANCED DATA</div>
    </div>
  );
}
