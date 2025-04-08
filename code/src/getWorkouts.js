/**
 * getWorkouts.js
 * 
 * Fetches a list of exercises from the Wger Workout Manager API.
 * 
 * Returns:
 * - If successful: an array of workout objects from the API
 * 
 * Notes:
 * - Requires a valid Wger API token stored in REACT_APP_WGER_API_KEY
 * - Language is set to English (language=2)
 */

export const getWorkouts = async () => {
    const API_KEY = process.env.REACT_APP_WGER_API_KEY;
    const url = `https://wger.de/api/v2/exercise/?language=2`;  
    
    
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

  