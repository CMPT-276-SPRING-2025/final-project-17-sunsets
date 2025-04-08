/**
 * getWeather.js
 * 
 * Fetches current weather data for a specified city using the OpenWeatherMap API.
 * 
 * Parameters:
 * - city (string): City name to query weather for. Defaults to "New York".
 * 
 * Returns:
 * - If successful: an object containing:
 *   - temperature (number): Temperature in Celsius
 *   - condition (string): Weather condition (e.g., "clear", "clouds", etc.)
 * - If error: returns null
 * 
 * Notes:
 * - Requires a valid OpenWeatherMap API key stored in REACT_APP_WEATHER_API_KEY
 */
export const getWeather = async (city = "New York") => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        
        return {
          temperature: data.main.temp,
          condition: data.weather[0].main.toLowerCase(), 
        };
      } else {
       
        return null;
      }
    } catch (error) {
      
      return null;
    }
  };
 

