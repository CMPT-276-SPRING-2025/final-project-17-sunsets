export const getWorkouts = async () => {
    const API_KEY = process.env.REACT_APP_WGER_API_KEY;
    const url = `https://wger.de/api/v2/exercise/?language=2`;  // Wger API endpoint for exercises
    
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Token ${API_KEY}`,  // API key for authorization
        }
      });
      const data = await response.json();
      
      if (response.ok) {
       // console.log(data.results);
        return data.results;  // Return list of workouts
        
      } else {
        console.error("Wger API error:", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching workout data:", error);
      return null;
    }
  };

  