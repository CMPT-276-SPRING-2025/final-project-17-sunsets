import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Workouts from './pages/Workouts.js';
import Weather from './pages/Weather.js';
import './App.css';
import { WeatherCityProvider, useWeatherCity } from './WeatherCity.js'; 
import WelcomeModal from './pages/WelcomeModal.js';

function App() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenWelcome');
    if (!hasSeen) {
      setShowWelcome(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  return (
    <WeatherCityProvider>
      <Router>
        <div className="app-container">
          {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
          <WeatherInfo />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Workouts />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </Router>
    </WeatherCityProvider>
  );
}

function WeatherInfo() {
  const { weather, isLoading } = useWeatherCity();

  return (
      <div className="temperature-display">
        {isLoading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <p>Currently: {weather.main.temp} °C in {weather.name}</p>
        ) : (
          <p>Weather data unavailable</p>
        )}
      </div>
  );
}

export default App;
