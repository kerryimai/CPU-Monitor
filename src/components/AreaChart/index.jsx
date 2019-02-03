import React, { Component } from "react";
import Chart from "chart.js/dist/Chart.min.js";
import styles from "./styles.module.css";

const data = {
  labels: [],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(206,151,151,0.32)",
      pointBackgroundColor: "#ecd6d6",
      borderColor: "#ce9797",
      pointHighlightStroke: "#ce9797",
      data: []
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          fontColor: "#b1b1b1"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: "#b1b1b1"
        }
      }
    ]
  },
  legend: {
    display: false
  }
};

class AreaChart extends Component {
  componentDidMount() {
    const ctx = this.canvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });
  }

  addData = loadAve => {
    this.chart.data.datasets.forEach(dataset => {
      dataset.data.push(Object.values(loadAve)[0]);
    });
    this.chart.data.labels.push(Object.keys(loadAve)[0]);
    this.chart.update();
  };

  componentDidUpdate(prev) {
    if (this.props.loadAveRecords.length) {
      const newLoadAve = this.props.loadAveRecords[
        this.props.loadAveRecords.length - 1
      ];
      this.addData(newLoadAve);
    }
  }

  render() {
    return (
      <div className={styles.canvasContainer}>
        <canvas ref={r => (this.canvas = r)} />;
      </div>
    );
  }
}

export default AreaChart;
