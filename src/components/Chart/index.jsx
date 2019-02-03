import React, { Component } from "react";
import styles from "./styles.module.css";
import CapsuleBar from "../CapsuleBar";

const weekProgress = [
  { day: "Mon", amount: 4 },
  { day: "Tue", amount: 5 },
  { day: "Wed", amount: 10 },
  { day: "Thu", amount: 1 },
  { day: "Fri", amount: 2 },
  { day: "Sat", amount: 8 },
  { day: "Sun", amount: 5 }
];

class Chart extends Component {
  render() {
    return (
      <div className={styles.gridBackground}>
        {weekProgress.map(day => (
          <CapsuleBar key={day.day} quantity={day.amount} label={day.day} />
        ))}
      </div>
    );
  }
}

export default Chart;
