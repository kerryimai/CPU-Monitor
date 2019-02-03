import React, { Component } from "react";
import styles from "../styles.module.css";
import UpperDashboard from "../UpperDashboard";
import AreaChart from "../../components/AreaChart";
import fetchCPU, { fetchCPUs } from "../../fetchCPU";
import moment from "moment";

class Dashboard extends Component {
  state = {
    loadAveRecords: [],
    CPUUsage: { 1: 0, 5: 0, 10: 0 },
    CPUCounts: null
  };

  componentDidMount() {
    this.initInterval();
    fetchCPUs().then(res => this.setState({ CPUCounts: res.cpus }));
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

  setCPUUsage = usage => {
    console.log("ASFD", usage);
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
    const { loadAveRecords, CPUUsage, CPUCounts } = this.state;
    return (
      <div className={styles.mainBoard}>
        <UpperDashboard CPUCounts={CPUCounts} CPUUsage={CPUUsage} />
        <div className={styles.dashBottom}>
          <AreaChart loadAveRecords={loadAveRecords} CPUUsage={CPUUsage} />
        </div>
      </div>
    );
  }
}

export default Dashboard;