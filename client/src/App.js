import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Determine dark mode preference only on mount
  // useEffect(() => {
  //   if (
  //     window.matchMedia &&
  //     window.matchMedia('(prefers-color-scheme: dark)').matches
  //   ) {
  //     setDarkMode(true);
  //     document.documentElement.setAttribute('data-bs-theme', 'dark');
  //   }
  // }, []);

  const toggleTheme = () => {
    const isDark = darkMode;
    setDarkMode(!darkMode);
    if (isDark) {
      document.documentElement.removeAttribute('data-bs-theme', '');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* <Route path='/' element={<Home />}>
          <Route path='login' element={<Auth authType='login' />} />
          <Route path='register' element={<Auth authType='sign up' />} />
        </Route> */}
      </Routes>
      <button onClick={toggleTheme}>theme</button>
    </div>
  );
}

export default App;
