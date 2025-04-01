import { getWeather } from './getWeather.js'; 
import { getWorkouts } from './getWorkouts.js';

export const clothingOptions = {
    clear: [
      ["T-shirt", "Shorts", "Sunglasses"],
      ["Tank top", "Cargo shorts", "Hat"],
      ["Long sleeve shirt", "Jeans", "Sneakers"],
    ],
    rain: [
      ["Rain jacket", "Waterproof shoes", "Umbrella"],
      ["Waterproof coat", "Boots", "Poncho"],
      ["Rainproof hoodie", "Gum boots", "Hat"],
    ],
    snow: [
      ["Winter coat", "Gloves", "Beanie"],
      ["Puffer jacket", "Thermal pants", "Snow boots"],
      ["Insulated jacket", "Scarf", "Wool gloves"],
    ],
    clouds: [
      ["Light jacket", "Jeans", "Scarf"],
      ["Cardigan", "Trousers", "Boots"],
      ["Sweater", "Leggings", "Hat"],
    ],
    drizzle: [
      ["Windbreaker", "Tight pants", "Beanie"],
      ["Light jacket", "Cargo pants", "Gloves"],
      ["Hoodie", "Wind pants", "Cap"],
    ],
    haze: [
      ["Tank top", "Shorts", "Flip-flops"],
      ["T-shirt", "Swim trunks", "Sunglasses"],
      ["Short-sleeve shirt", "Board shorts", "Hat"],
    ],
    smoke: [
      ["Sweater", "Jeans", "Boots"],
      ["Long-sleeve shirt", "Corduroy pants", "Wool hat"],
      ["Thermal jacket", "Leggings", "Scarf"],
    ],
    thunderstorm: [
      ["Rainproof jacket", "Heavy boots", "Hoodie"],
      ["Storm jacket", "Waterproof pants", "Rubber boots"],
      ["Windproof coat", "Hiking boots", "Thermal gloves"],
    ]
  };
  
  export const getClothingRecommendation = (weather) => {
    const options = clothingOptions[weather] || [["Standard activewear"]];
    const randomSetIndex = Math.floor(Math.random() * options.length);
    const randomSet = options[randomSetIndex];
    return randomSet;
  };
  
  export const workoutMapping = [
    { min: -100, max: 5, category: 8 },  // Cold for arms
    { min: 6, max: 15, category: 9 },   // Cool for legs
    { min: 16, max: 25, category: 10 }, // Warm for abs
    { min: 26, max: 100, category: 15 } // Hot for cardio
  ];

  const getRandomExerciseName = async (category) => {
    const API_KEY = process.env.REACT_APP_WGER_API_KEY;

    try {
        // Fetch exercises for the category
        const exerciseResponse = await fetch(`https://wger.de/api/v2/exercise/?category=${category}&language=2`, {
            headers: { 'Authorization': `Token ${API_KEY}` }
        });
        const exerciseData = await exerciseResponse.json();

        if (!exerciseResponse.ok || exerciseData.results.length === 0) {
            return "No exercises found for this category.";
        }

        // Pick a random exercise and get its ID
        
        const randomIndex = Math.floor(Math.random() * exerciseData.results.length);
        
        const exerciseUUID = exerciseData.results[randomIndex].id;
       // console.log(exerciseData.results[randomIndex])
       // console.log(exerciseUUID);

        // Fetch the exercise name using the ID
        //https://wger.de/api/v2/exercise/?uuid="d7bbafc-4092-4194-aa20-e380f1fe45f"&language=2
        //const translationResponse = await fetch(`https://wger.de/api/v2/exercise-translation/?uuid=${exerciseUUID}`
        //https://wger.de/api/v2/exercise-translation/?uuid=d7bbafc-4092-4194-aa20-e380f1fe45f0&languages=2
        const translationResponse = await fetch(`https://wger.de/api/v2/exercise-translation/?exercise=${exerciseUUID}&languages=2`, {
            headers: { 'Authorization': `Token ${API_KEY}` }
        });
        const translationData = await translationResponse.json();

        if (!translationResponse.ok) {
            return "Error fetching exercise name.";
        }
        //console.log(translationData);
        for (let i = 0; i < translationData.results.length; i++) {
          if (translationData.results[i].language === 2) {
              return translationData.results[i].name || "Exercise name unavailable.";
          }
      }

      // If no exercise with language 2 found
      return "Exercise name unavailable.";

    } catch (error) {
        console.error("Error fetching workout data:", error);
        return "Error fetching workouts.";
    }
};

export const getRecommendations = async (city = "Vancouver,BC,CA") => {
    const weather = await getWeather(city);
    if (!weather) return "Weather data unavailable. Try again later.";

    const { temperature, condition } = weather;

    // Determine workout category
    let workoutCategory = 8;
    for (const range of workoutMapping) {
        if (temperature >= range.min && temperature <= range.max) {
            workoutCategory = range.category;
            break;
        }
    }

    // Fetch a random exercise name
    const recommendedWorkout = await getRandomExerciseName(workoutCategory);

    // Get clothing recommendation
    const recommendedClothing = getClothingRecommendation(condition);

    return {
        weather: `Temperature: ${temperature}°C, Condition: ${condition}`,
        recommendedWorkout,
        recommendedClothing
    };
  };

