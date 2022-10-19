import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value }) => {
  const MIN = 0;
  const MAX = 100;
  const percentage = `${Math.min(Math.max(value, MIN), MAX)}%`;

  return (
    <div className="progress-bar">
      <span className="text">{percentage}</span>
      <div className="progress" style={{ width: percentage }}></div>
    </div>
  );
};

ProgressBar.defaultProps = {
  value: 0,
};

export default ProgressBar;
