import React, { Component } from "react";
import { PropTypes as T } from "prop-types";
import classNames from "classnames";
import styles from "./styles.module.css";

class ProgressBar extends Component {
  static propTypes = {
    completion: T.number,
    label: T.string
  };

  getPercentage = () => {
    const val = (this.props.completion / this.props.CPUCounts) * 100;
    return parseFloat(val.toFixed(2));
  };
  render() {
    const percent = this.getPercentage();
    const style = { width: `${percent <= 100 ? percent : 100}%` };

    return (
      <div className={styles.progressbarWrapper}>
        <div className={styles.progressbarLabel}>{this.props.label} min</div>
        <div className={styles.progressbar}>
          <div
            className={classNames({
              [styles.completion]: percent <= 100,
              [styles.over]: percent > 100
            })}
            style={style}
          />
        </div>
        <div className={styles.progressNum}>{percent || 0}%</div>
      </div>
    );
  }
}

export default ProgressBar;
