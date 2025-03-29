
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
        console.error("Weather API error:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };
 

