import React, { useState } from 'react';
import './Weather.css';
import NavBar from './NavBar.js'; 
import { useWeatherCity } from '../WeatherCity.js';

function Weather() {
  const { city, setCity, weather, error, isLoading } = useWeatherCity();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="weather-page">
      <div className="dashboardButtonContainer">
        <NavBar />
      </div>

      <h1 id="title">Weather App</h1>
      
      <form onSubmit={handleSubmit} className="search-bar-container">
        <input
          type="text"
          placeholder="Enter City (City ,Prov/State, Country)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">Error: {error}. Please enter a valid location with the provided format.</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      {weather && !isLoading && (
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