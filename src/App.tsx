import React, { useEffect } from 'react';
import Calendar from './components/Calendar/Calendar';
import './App.css';
import { useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <header className='title-header'>
        <h1>Calendar</h1>
      <ThemeToggle />
      </header>
      <Calendar />
      
    </div>
  );
}

export default App;
