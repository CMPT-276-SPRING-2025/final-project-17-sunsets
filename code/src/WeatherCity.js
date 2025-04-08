/**
 * WeatherCityContext.js
 * 
 * Provides weather data and city state globally via React Context.
 * - Fetches weather data using OpenWeatherMap API based on the current city.
 * - Exposes `city`, `setCity`, `weather`, `error`, and `isLoading` to consumers.
 * - Fetches new weather data whenever the city changes.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherCityContext = createContext();

// WeatherCityProvider wraps children and supplies them with weather-related state
export const WeatherCityProvider = ({ children }) => {
  const [city, setCity] = useState('Vancouver');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

   // Fetch weather data from OpenWeatherMap API
  const fetchWeather = async (city) => {
    setIsLoading(true);
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

 
  // Re-fetch weather whenever the city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <WeatherCityContext.Provider value={{ 
      city, 
      setCity, 
      weather, 
      error, 
      isLoading 
    }}>
      {children}
    </WeatherCityContext.Provider>
  );
};

// Custom hook to access weather context from any component
export const useWeatherCity = () => useContext(WeatherCityContext);