import React, { Component } from "react";
import styles from "../styles.module.css";
import UpperDashboard from "../UpperDashboard";
import AreaChart from "../../components/AreaChart";
import fetchCPU, { fetchCPUs } from "../../fetchCPU";
import moment from "moment";

class Dashboard extends Component {
  state = {
    loadAveRecords: [],
    CPUUsage: { 1: 0, 5: 0, 10: 0 }
  };

  componentDidMount() {
    this.initInterval();
  }

  initInterval = () => {
    this.interval = setInterval(() => {
      fetchCPU()
        .then(res => {
          this.setCPUUsage(res.loadAverage);
          const time = moment().format("LTS");
          this.setState({
            loadAveRecords: [
              ...this.state.loadAveRecords,
              { [time]: parseFloat(res.loadAverage[0].toFixed(2)) }
            ]
          });
        })
        .catch(err => console.log("ERR", err));
    }, 5000);
  };

  isOverLimit = lists => {};

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
    const { loadAveRecords, CPUUsage } = this.state;
    return (
      <div className={styles.mainBoard}>
        <UpperDashboard CPUUsage={CPUUsage} />
        <div className={styles.dashBottom}>
          <AreaChart loadAveRecords={loadAveRecords} CPUUsage={CPUUsage} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
