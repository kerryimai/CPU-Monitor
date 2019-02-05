import React, { Component } from "react";
import styles from "../styles.module.css";
import UpperDashboard from "../UpperDashboard";
import AreaChart from "../../components/AreaChart";
import fetchCPU from "../../fetchCPU";
import moment from "moment";

class Dashboard extends Component {
  state = {
    loadAveRecords: [],
    CPUUsage: { 1: 0, 5: 0, 10: 0 },
    isOverLimit: false,
    alertRecord: []
  };

  componentDidMount() {
    this.initInterval(5000);
  }

  initInterval = interval => {
    this.interval = setInterval(() => {
      fetchCPU()
        .then(res => {
          this.setCPUUsage(res.loadAverage);
          const time = moment().format("LTS");
          this.setState(
            {
              loadAveRecords: [
                ...this.state.loadAveRecords,
                { [time]: parseFloat(res.loadAverage[0].toFixed(2)) }
              ]
            },
            () => this.checkIfOverLimit(this.state.loadAveRecords)
          );
        })
        .catch(err => console.log("ERR", err));
    }, interval);
  };

  checkIfOverLimit = list => {
    const twoMinsAverage = this.lastTwoMinAverage(list);
    if (!this.state.isOverLimit && twoMinsAverage > 1) {
      // should I create new time?
      this.setState({
        isOverLimit: true,
        alertRecord: [
          {
            isAlert: true,
            time: moment().format("LTS"),
            value: twoMinsAverage
          },
          ...this.state.alertRecord
        ]
      });
    } else if (this.state.isOverLimit && twoMinsAverage <= 1) {
      this.setState({
        isOverLimit: false,
        alertRecord: [
          {
            isAlert: false,
            time: moment().format("LTS"),
            value: twoMinsAverage
          },
          ...this.state.alertRecord
        ]
      });
    }
  };

  lastTwoMinAverage = lists => {
    if (lists.length < 7) {
      return -1;
    } else {
      const firstMinute = lists[lists.length - 1];
      const secondMinute = lists[lists.length - 7];
      return (
        (Object.values(firstMinute)[0] + Object.values(secondMinute)[0]) / 2
      );
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
