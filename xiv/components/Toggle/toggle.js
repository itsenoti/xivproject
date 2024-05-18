import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";

const ThemeSwitcher = ({ theme, toggleTheme }) => {
  const isLight = theme === "light";

  return (
    <button onClick={toggleTheme}>
      <LightModeIcon />
      <DarkModeIcon />
    </button>
  );
};

ThemeSwitcher.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default ThemeSwitcher;
