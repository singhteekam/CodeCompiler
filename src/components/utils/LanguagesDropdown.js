import React from "react";
import Select from "react-select";
import {languages} from "./languages";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select className="custom-select"
      placeholder={`Filter By Category`}
      options={languages}
      // styles={customStyles}
      defaultValue={languages[1]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
