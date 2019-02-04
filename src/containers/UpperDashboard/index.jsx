import React, { Component } from "react";
import ProgressBar from "../../components/ProgressBar";
import styles from "../styles.module.css";

class UpperDashboard extends Component {
  render() {
    const { CPUUsage } = this.props;
    return (
      <div className={styles.dashUpper}>
        <div className={styles.dashUpLeft}>
          <h1> CPU Tracker </h1>
          <div className={styles.progressbarContainer}>
            {Object.keys(CPUUsage).map(key => (
              <ProgressBar key={key} completion={CPUUsage[key]} label={key} />
            ))}
          </div>
          <div className={styles.chartTitle}>Load Average Monitor</div>
        </div>

        <div className={styles.dashUpRight} />
      </div>
    );
  }
}

export default UpperDashboard;
