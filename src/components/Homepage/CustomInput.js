import React from "react";
import "./Homepage.css";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className="custom-input"
      ></textarea>
    </>
  );
};

export default CustomInput;
