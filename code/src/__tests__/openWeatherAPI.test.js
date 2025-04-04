describe('OpenWeatherMap API', () => {
    it('fetches real weather data from OpenWeatherMap', async () => {
      const API_KEY = '25124b238c6dc448050f80e9d16ace91'; // hard coded because I canont use github secrets 
      const city = 'Vancouver';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('main');
      expect(data.main).toHaveProperty('temp');
    });
  });
  