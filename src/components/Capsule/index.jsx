import React, { Component } from "react";
import styles from "./styles.module.css";
import classnames from "classnames";
const Capsule = ({ record }) => (
  <div
    className={classnames(styles.capsule, {
      [styles.recovery]: !record.isAlert
    })}
  >
    {record.isAlert
      ? `High load generated an alert - load = ${record.value},
    triggered at ${record.time}`
      : `Load is now stable - load = ${record.value},
    recovered at ${record.time}`}
  </div>
);

export default Capsule;
