import React from "react";

const ResultDisplay = ({ outputInfo }) => {
  const getOutput = () => {
    let statusId = outputInfo?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputInfo?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputInfo.stdout) !== null
            ? `${atob(outputInfo.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputInfo?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <h4 className="output-header">
        Output
      </h4>
      <div className="result-display">
        <p>{outputInfo ? <>{getOutput()}</> : null}</p>
      </div>
    </>
  );
};

export default ResultDisplay;
