import React, { Component } from "react";
import ProgressBar from "../../components/ProgressBar";
import styles from "../styles.module.css";
import Capsule from "../../components/Capsule";

class UpperDashboard extends Component {
  buildAlertRecords = records =>
    records.map(record => <Capsule record={record} key={record.time} />);

  render() {
    const { CPUUsage, alertRecord } = this.props;
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

        <div className={styles.dashUpRight}>
          <div className={styles.innerContainer}>
            {alertRecord.length ? (
              this.buildAlertRecords(alertRecord)
            ) : (
              <h1 className={styles.emptyAlert}> Your Alerts</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UpperDashboard;
