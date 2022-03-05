import { useState } from "react";
import classes from "./digitalClock.module.css";
import "animate.css";

function DigitalClock() {
  const [render, setRender] = useState(false);

  setTimeout(() => {
    setRender(!render);
  }, 1000);

  const dateFetch = new Date();
  return (
    <div className={`${classes.dateAndTimeInfo}`}>
      <div className={classes.timeInfo}>{`${`${dateFetch.getHours()}`.padStart(
        2,
        "0"
      )}:${`${dateFetch.getMinutes()}`.padStart(
        2,
        "0"
      )}:${`${dateFetch.getSeconds()}`.padStart(2, "0")}`}</div>
      <div
        className={classes.dateInfo}
      >{`${dateFetch.getDate()} ${new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format()}, ${dateFetch.getFullYear()}`}</div>
    </div>
  );
}

export default DigitalClock;
