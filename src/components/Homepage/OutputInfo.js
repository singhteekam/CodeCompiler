import React from "react";

const OutputInfo = ({ outputInfo }) => {
  return (
    <div className="output-info">
      <b>Status: {outputInfo?.status?.description}</b>
      <br />
      <b>Memory: {outputInfo?.memory}</b>
      <br />
      <b>Time: {outputInfo?.time}</b>
    </div>
  );
};

export default OutputInfo;
