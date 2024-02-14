import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";

const ThemesDropdown = ({ handleThemeChange, theme }) => {
  return (
    <Select className="custom-select"
      placeholder={`Select Theme`}
      // options={languageOptions}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      // styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemesDropdown;
