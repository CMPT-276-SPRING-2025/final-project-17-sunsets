  const testWeather = async () => {
    const city = "New York";  
    const result = await getWeather(city);
    
    if (result) {
      console.log(`Temperature in ${city}: ${result.temperature}°C`);
      console.log(`Condition: ${result.condition}`);
    } else {
      console.log("Failed to retrieve weather data.");
    }
  };
  
  testWeather();