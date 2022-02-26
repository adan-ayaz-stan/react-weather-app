import { useState } from "react";
import classes from "./digitalClock.module.css";

function DigitalClock() {
  const [evaluationState, setEvaluationState] = useState(false);

  const dateFetch = new Date();
  let date = `${dateFetch.getDay()} ${new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format()}, ${dateFetch.getFullYear()}`;
  let hours = `${dateFetch.getHours()}`;
  let minutes = `${dateFetch.getMinutes()}`;
  let seconds = `${dateFetch.getSeconds()}`;
  let time = `${hours.padStart(2, "0")}:${minutes.padStart(
    2,
    "0"
  )}:${seconds.padStart(2, "0")}`;

  setInterval(() => {
    setEvaluationState(!evaluationState);
  }, 1000);

  return (
    <div className={classes.dateAndTimeInfo}>
      <div className={classes.timeInfo}>{time}</div>
      <div className={classes.dateInfo}>{date}</div>
    </div>
  );
}

export default DigitalClock;
