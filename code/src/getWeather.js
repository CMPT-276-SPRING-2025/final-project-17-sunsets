
export const getWeather = async (city = "New York") => {
  //get api key and url endpoint
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  
  try {
    //gets request to openweather api and returns temp and weather condition
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
 

