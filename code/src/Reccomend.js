import { useWeatherCity } from './WeatherCity.js';

//pre defined clothing reccomendations based on weather condition
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

//gets a random clothing reccomendation for a given weather condition, 
//gets clothing set than uses a random element from set and returns it
export const getClothingRecommendation = (weatherCondition) => {
    const normalizedCondition = weatherCondition.toLowerCase();
    const options = clothingOptions[normalizedCondition] || [["Standard activewear"]];
    const randomSetIndex = Math.floor(Math.random() * options.length);
    return options[randomSetIndex];
};

//maps temprature to a workout category on wger api
export const workoutMapping = [
    { min: -100, max: 5, category: 8 },
    { min: 6, max: 15, category: 9 },
    { min: 16, max: 25, category: 10 },
    { min: 26, max: 100, category: 15 }
];

//hook that provides workout and clothing reccomendation
export const useRecommendations = () => {
    const { weather, isLoading: weatherLoading, error: weatherError } = useWeatherCity();

    const getRecommendations = async () => {
        if (weatherLoading) return { message: "Loading weather data..." };
        if (weatherError) return { message: `Weather error: ${weatherError}` };
        if (!weather) return { message: "No weather data available." };

        const temperature = weather.main?.temp;
        const condition = weather.weather?.[0]?.main?.toLowerCase();

        //validation of weather data
        if (temperature === undefined || !condition) {
            return { message: "Incomplete weather data." };
        }

        //get clothing recommendation based on condition
        const recommendedClothing = getClothingRecommendation(condition);
        let recommendedWorkout = [];
        let workoutEnvironment = "";

        //suggest outdoor workouts if warm enough, exercises are hardcoded as wger api does not 
        //specify these specific activities
        if (temperature > 20) {
            // Outdoor activity suggestion
            const outdoorActivities = [
                "Running", "Jogging", "Basketball", "Cycling", "Soccer", "Tennis", "Hiking"
            ];
            //random element picked from set
            const randomIndex = Math.floor(Math.random() * outdoorActivities.length);
            recommendedWorkout = [outdoorActivities[randomIndex]];
            workoutEnvironment = "Great weather for outdoor activities!";
        } else {
            // Indoor: get 3 exercises from API
            //finds category matching to weather
            let workoutCategory = 8;
            for (const range of workoutMapping) {
                if (temperature >= range.min && temperature <= range.max) {
                    workoutCategory = range.category;
                    break;
                }
            }

            //wger api built in function as the endpoint is a different access than regular file
            const API_KEY = process.env.REACT_APP_WGER_API_KEY;
            try {
                const response = await fetch(`https://wger.de/api/v2/exercise/?category=${workoutCategory}&language=2&limit=100`, {
                    headers: { 'Authorization': `Token ${API_KEY}` }
                });
                const data = await response.json();

                if (!response.ok || data.results.length === 0) {
                    recommendedWorkout = ["No exercises found for this category."];
                } else {
                    //goes through category set pulled from wger api and picks 3 exercises at random
                    //then it fetches the name of exercises on translation wger url
                    const uniqueExercises = new Set();
                    while (uniqueExercises.size < 3 && uniqueExercises.size < data.results.length) {
                        const randomIndex = Math.floor(Math.random() * data.results.length);
                        const exerciseId = data.results[randomIndex].id;

                        const translationRes = await fetch(`https://wger.de/api/v2/exercise-translation/?exercise=${exerciseId}&language=2`, {
                            headers: { 'Authorization': `Token ${API_KEY}` }
                        });
                        const translationData = await translationRes.json();
                        const translation = translationData.results.find(item => item.language === 2);

                        if (translation?.name) {
                            uniqueExercises.add(translation.name);
                        }
                    }

                    recommendedWorkout = Array.from(uniqueExercises);
                }

            } catch (error) {
                recommendedWorkout = ["Error fetching workouts."];
            }


            //failsafe for dangerous weather
            workoutEnvironment = ["rain", "snow", "thunderstorm", "drizzle"].includes(condition)
                ? "Indoor workout recommended due to weather."
                : "Outdoor activity possible, dress appropriately.";
        }

        return {
            //return statements to be used in other file
            weather: `Temperature: ${Math.round(temperature)}°C, Condition: ${condition}`,
            recommendedWorkout,
            recommendedClothing, 
            workoutEnvironment,
            rawWeather: {
                temperature,
                condition
            }
        };
    };

    return {
        getRecommendations,
        isLoading: weatherLoading,
        error: weatherError
    };
};
