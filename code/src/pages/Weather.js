import React, { useState, useEffect } from 'react';
import './Weather.css';
import NavBar from './NavBar.js'; // <-- Import your NavBar

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery('');
    }
  };

  return (
    <div>
      {/* Reuse the NavBar here */}
      <div className="dashboardButtonContainer">
        <NavBar />
      </div>

      <h1 id="title">Weather App</h1>
      
      <form onSubmit={handleSubmit} className="search-bar-container">
        <input
          type="text"
          placeholder="Enter city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">Error: {error}</div>}
      {!weather && !error && <div className="loading-message">Loading...</div>}

      {weather && (
        <div className="weather-info-container">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
