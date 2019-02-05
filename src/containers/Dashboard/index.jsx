import React, { Component } from "react";
import styles from "../styles.module.css";
import UpperDashboard from "../UpperDashboard";
import AreaChart from "../../components/AreaChart";
import fetchCPU from "../../fetchCPU";
import moment from "moment";
import calculateTwoMinAverage from "./calculateTwoMinAverage";

const THRESHOLD = 1;
const INTERVAL = 10000;
const MAX_LENGTH = 60;

class Dashboard extends Component {
  state = {
    loadAveRecords: [],
    CPUUsage: { 1: 0, 5: 0, 10: 0 },
    isOverLimit: false,
    alertRecord: []
  };

  componentDidMount() {
    this.initInterval(INTERVAL);
  }

  initInterval = interval => {
    this.interval = setInterval(() => {
      fetchCPU()
        .then(res => {
          this.setCPUUsage(res.loadAverage);
          const time = moment().format("LTS");
          const prevRecords =
            this.state.loadAveRecords.length > MAX_LENGTH
              ? this.state.loadAveRecords.slice(
                  this.state.loadAveRecords.length - MAX_LENGTH
                )
              : this.state.loadAveRecords;
          this.setState(
            {
              loadAveRecords: [
                ...prevRecords,
                { [time]: parseFloat(res.loadAverage[0].toFixed(2)) }
              ]
            },
            this.checkIfOverLimit
          );
        })
        .catch(err => console.log("ERR", err));
    }, interval);
  };

  checkIfOverLimit = () => {
    const twoMinAverage = calculateTwoMinAverage(this.state.loadAveRecords);
    const isOverLimit = twoMinAverage > THRESHOLD;
    if (isOverLimit !== this.state.isOverLimit) {
      // we've changed state!
      this.setState({
        isOverLimit,
        alertRecord: [
          {
            isAlert: isOverLimit,
            time: moment().format("LTS"),
            value: twoMinAverage
          },
          ...this.state.alertRecord
        ]
      });
    }
  };

  setCPUUsage = usage => {
    this.setState({
      CPUUsage: {
        1: parseFloat(usage[0].toFixed(2)),
        5: parseFloat(usage[1].toFixed(2)),
        10: parseFloat(usage[2].toFixed(2))
      }
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    const { loadAveRecords, CPUUsage, isOverLimit, alertRecord } = this.state;
    return (
      <div className={styles.mainBoard}>
        <UpperDashboard
          CPUUsage={CPUUsage}
          isOverLimit={isOverLimit}
          alertRecord={alertRecord}
        />
        <div className={styles.dashBottom}>
          <AreaChart loadAveRecords={loadAveRecords} CPUUsage={CPUUsage} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
