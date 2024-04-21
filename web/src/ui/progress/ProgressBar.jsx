import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: "385px",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "15px 16px",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed > 100 ? 100 : completed}%`,
    backgroundColor: `${completed > 100 ? "#E51717" : bgcolor}`,
    borderRadius: "inherit",
    textAlign: "right",
  };
  const ProgressBar = {
    display: "flex",
  };

  return (
    <div style={ProgressBar}>
      <div>
        <p>Склад {props.idx + 1}</p>
      </div>
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
      <div>
        <p> {`${completed}%`}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
