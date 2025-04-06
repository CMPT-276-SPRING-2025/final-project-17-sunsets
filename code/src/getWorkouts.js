export const getWorkouts = async () => {
  //gets wger api key from env and sets url endpoint
  const API_KEY = process.env.REACT_APP_WGER_API_KEY;
  const url = `https://wger.de/api/v2/exercise/?language=2`;  
  
  //gets data in form of exercises
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Token ${API_KEY}`,
      }
    });
    const data = await response.json();
    
    if (response.ok) {
      return data.results;  // Return list of workouts
      
    } else {
    
      return null;
    }
  } catch (error) {
    
    return null;
  }
};

  