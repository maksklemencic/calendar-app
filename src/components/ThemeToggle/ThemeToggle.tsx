import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";


const ThemeToggle = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? <MdOutlineLightMode size={"1.2em"}/> : <MdOutlineDarkMode size={"1.2em"}/>}
      Change to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};

export default ThemeToggle;
