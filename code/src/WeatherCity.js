import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherCityContext = createContext();

export const WeatherCityProvider = ({ children }) => {
  const [city, setCity] = useState('Vancouver');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //fetches weather, and provides context and magnes the weather fetching logic for rest of app
  //goal of this file is to ensure that across all files that the weather is the same
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

export const useWeatherCity = () => useContext(WeatherCityContext);