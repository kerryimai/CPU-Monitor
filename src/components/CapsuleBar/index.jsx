import React, { Component } from "react";
import Capsule from "./Capsule";
import styles from "./styles.module.css";
class CapsuleBar extends Component {
  render() {
    return (
      <div className={styles.capsuleBar}>
        <h3>{this.props.quantity}</h3>
        {[...Array(this.props.quantity)].map((_, i) => (
          <Capsule key={i} />
        ))}

        <div className={styles.chartLabel}>{this.props.label}</div>
      </div>
    );
  }
}

export default CapsuleBar;
