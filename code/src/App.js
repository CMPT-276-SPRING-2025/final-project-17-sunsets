import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Workouts from './pages/Workouts.js';
import Weather from './pages/Weather.js';
import './App.css'; 

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


function App() {


  const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Vancouver');
    const [query, setQuery] = useState('');
  
    useEffect(() => {
      setWeather(null);
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          return response.json();
        })
        .then(data => {
          setWeather(data);
          setError(null);
        })
        .catch(err => setError(err.message));
    }, [city]);



  return (
    <Router>
      <div>
        <div className="temperature-display">
          {weather ? (
            <p>Temperature: {weather.main.temp} °C</p>
          ) : (
            <p>Loading...</p>  
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Workouts />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
