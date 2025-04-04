describe('WGER API', () => {
    it('fetches real exercise data from WGER API', async () => {
      const API_KEY = 'e970f02e43e2269b84f456c80f07e5f181b71fab'; // hard coded because I canont use github secrets 
      const url = `https://wger.de/api/v2/exercise/?language=2&limit=5`;
  
      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${API_KEY}`,
        },
      });
  
      const data = await response.json();
  
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('results');
      expect(Array.isArray(data.results)).toBe(true);
      expect(data.results.length).toBeGreaterThan(0);
    });
  });
  