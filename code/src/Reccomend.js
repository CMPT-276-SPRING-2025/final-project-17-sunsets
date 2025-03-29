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
    cloudy: [
      ["Light jacket", "Jeans", "Scarf"],
      ["Cardigan", "Trousers", "Boots"],
      ["Sweater", "Leggings", "Hat"],
    ],
    windy: [
      ["Windbreaker", "Tight pants", "Beanie"],
      ["Light jacket", "Cargo pants", "Gloves"],
      ["Hoodie", "Wind pants", "Cap"],
    ],
    hot: [
      ["Tank top", "Shorts", "Flip-flops"],
      ["T-shirt", "Swim trunks", "Sunglasses"],
      ["Short-sleeve shirt", "Board shorts", "Hat"],
    ],
    cold: [
      ["Sweater", "Jeans", "Boots"],
      ["Long-sleeve shirt", "Corduroy pants", "Wool hat"],
      ["Thermal jacket", "Leggings", "Scarf"],
    ],
    stormy: [
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
    { min: -100, max: 5, category: 8 },  // Cold for Bodyweight
    { min: 6, max: 15, category: 9 },   // Cool for Strength Training
    { min: 16, max: 25, category: 14 }, // Warm forCardio
    { min: 26, max: 100, category: 10 } // Hot for Stretching
  ];

  export const getRecommendations = async (city = "New York") => {
    const weather = await getWeather(city);
    if (!weather) return "Weather data unavailable. Try again later.";
  
    const { temperature, condition } = weather;
  
    // Find workout cat
    let workoutCategory = 8;
    for (const range of workoutMapping) {
      if (temperature >= range.min && temperature <= range.max) {
        workoutCategory = range.category;
        break;
      }
    }
  
    // Fetch exercises
    const exercises = await getWorkouts(workoutCategory);
    let recommendedWorkout = "No suitable exercises found.";
    if (exercises.length > 0) {
      const randomIndex = Math.floor(Math.random() * exercises.length);
      recommendedWorkout = exercises[randomIndex].name;
    }
  
    // Get clothing recommendation
    const recommendedClothing = getClothingRecommendation(condition);
  
    return {
      weather: "Temperature: " + temperature + "°C, Condition: " + condition,
      recommendedWorkout: recommendedWorkout,
      recommendedClothing: recommendedClothing
    };
  };

