/**
 * Weather Component
 * -----------------
 * Displays weather information for a specific city. Users can search for a city,
 * and the component fetches and displays the weather data. It handles loading, errors,
 * and displays weather details like temperature and weather condition.
 * 
 * Features:
 * - Search input for city name (with proper format validation)
 * - Displays loading state and error messages
 * - Shows weather information such as temperature and condition when available
 * 
 * Hooks Used:
 * - useWeatherCity: Custom hook for managing city and weather data
 * 
 * Usage:
 * <Weather />
 */
import React, { useState } from 'react';
import './Weather.css';
import NavBar from './NavBar.js'; 
import { useWeatherCity } from '../WeatherCity.js';

function Weather() {
  // Extract data and functions from custom hook
  const { city, setCity, weather, error, isLoading } = useWeatherCity();
  const [query, setQuery] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setCity(query.trim());
      setQuery('');
    }
  };

  return (

    
    <div className="weather-page">

      {/* GitFit title and NavBar */}
      <div className="workoutsContainer2"> 
        <h1 id="title">GitFit</h1>
    
        <div className="dashboardButtonContainer"><NavBar /></div>
      </div>
      
      {/* Search Bar for city */}
      <form onSubmit={handleSubmit} className="search-bar-container">
        <input
          type="text"
          placeholder="Enter City (City, Prov/State, Country)"
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

      {/* Weather Information */}
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