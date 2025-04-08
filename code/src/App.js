/**
 * App.js
 * 
 * Main application entry point for GitFit.
 * 
 * Features:
 * - Displays a welcome modal to first-time users using localStorage.
 * - Uses React Router for page navigation (Home, Workouts, Weather).
 * - Wraps components in WeatherCityProvider context for global weather access.
 * - Displays current weather info in the header from the shared context.
 * 
 * Pages:
 * - "/"        → Home page
 * - "/about"   → Workouts page (should ideally be "/workouts" for clarity)
 * - "/weather" → Weather lookup and recommendations
 * 
 * Components:
 * - WelcomeModal: Introduction steps shown once to first-time users.
 * - WeatherInfo: Shows current weather temperature and location.
 */
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

  // Show WelcomeModal only if the user hasn't seen it before
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

// Displays current weather info or loading/error state
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
