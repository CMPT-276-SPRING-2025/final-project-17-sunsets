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

// Clothing recommendation with temperature awareness
export const getClothingRecommendation = (condition, temperature) => {
    const options = clothingOptions[condition] || [["Standard activewear"]];
    let filtered = options;

    if (temperature < 5) {
        filtered = options.filter(set =>
            set.some(item => /coat|jacket|thermal|boots|gloves|scarf|beanie|wool/i.test(item))
        );
    } else if (temperature >= 5 && temperature <= 15) {
        filtered = options.filter(set =>
            set.some(item => /long sleeve|sweater|light jacket|hoodie|jeans|trousers/i.test(item))
        );
    } else if (temperature > 25) {
        filtered = options.filter(set =>
            set.some(item => /tank|shorts|flip-flops|sunglasses/i.test(item))
        );
    }

    if (filtered.length === 0) filtered = options;

    const randomSetIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomSetIndex];
};

export const workoutMapping = [
    { min: -100, max: 5, category: 8 },
    { min: 6, max: 15, category: 9 },
    { min: 16, max: 25, category: 10 },
    { min: 26, max: 100, category: 15 }
];

// Random API-based exercise fetch
const getRandomExerciseName = async (category) => {
    const API_KEY = process.env.REACT_APP_WGER_API_KEY;

    try {
        const exerciseResponse = await fetch(`https://wger.de/api/v2/exercise/?category=${category}&language=2`, {
            headers: { 'Authorization': `Token ${API_KEY}` }
        });
        const exerciseData = await exerciseResponse.json();

        if (!exerciseResponse.ok || exerciseData.results.length === 0) {
            return "No exercises found for this category.";
        }

        const randomIndex = Math.floor(Math.random() * exerciseData.results.length);
        const exerciseUUID = exerciseData.results[randomIndex].id;

        const translationResponse = await fetch(`https://wger.de/api/v2/exercise-translation/?exercise=${exerciseUUID}&language=2`, {
            headers: { 'Authorization': `Token ${API_KEY}` }
        });
        const translationData = await translationResponse.json();

        if (!translationResponse.ok) {
            return "Error fetching exercise name.";
        }

        const translation = translationData.results.find(item => item.language === 2);
        return translation?.name || "Exercise name unavailable.";

    } catch (error) {
        console.error("Error fetching workout data:", error);
        return "Error fetching workouts.";
    }
};

// 🚀 Main recommendation logic
export const getRecommendations = async (city = "Vancouver,BC,CA") => {
    const weather = await getWeather(city);
    if (!weather) return "Weather data unavailable. Try again later.";

    const { temperature, condition } = weather;
    const recommendedClothing = getClothingRecommendation(condition, temperature);

    let workoutSuggestion = "";
    let workoutEnvironment = "";

    if (temperature > 20) {
        const outdoorActivities = ["Running", "Jogging", "Basketball", "Cycling", "Soccer", "Tennis", "Hiking"];
        const randomActivity = outdoorActivities[Math.floor(Math.random() * outdoorActivities.length)];
        workoutSuggestion = randomActivity;
        workoutEnvironment = "Great weather for outdoor activities!";
    } else {
        // Use mapping and API to get workout
        let workoutCategory = 8;
        for (const range of workoutMapping) {
            if (temperature >= range.min && temperature <= range.max) {
                workoutCategory = range.category;
                break;
            }
        }
        workoutSuggestion = await getRandomExerciseName(workoutCategory);
        workoutEnvironment = ["rain", "snow", "thunderstorm", "drizzle"].includes(condition.toLowerCase())
            ? "Indoor workout recommended due to weather."
            : "Outdoor activity possible but consider conditions.";
    }

    return {
        weather: `Temperature: ${temperature}°C, Condition: ${condition}`,
        recommendedClothing,
        recommendedWorkout: workoutSuggestion,
        workoutEnvironment
    };
};
