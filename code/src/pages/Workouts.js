/**
 * Workouts Component
 * ----------------------
 * This component handles the user's workout management, including:
 * 1. Displaying a list of exercises.
 * 2. Allowing users to add, remove, and modify exercises.
 * 3. Saving and resetting the workout routine.
 * 4. Fetching and displaying workout recommendations based on the user's location and weather conditions.
 *
 * It also interacts with the localStorage to persist exercises and provides a search feature for adding exercises.
 * 
 * State:
 * - exercises: Stores the list of exercises in the current workout.
 * - results: Stores the search results for exercises.
 * - recommendation: Stores the recommended workout based on the weather.
 * - isLoading: Indicates if the recommendation data is loading.
 * - error: Stores any errors related to fetching recommendations.
 * 
 * Dependencies:
 * - useRecommendations (custom hook for fetching workout recommendations)
 * - SearchBar and SearchResultsList (components for searching and displaying exercises)
 */
import React, { useState, useEffect } from 'react';
import './Workouts.css';
import NavBar from './NavBar.js';
import SearchBar from '../SearchBar.js';
import { SearchResultsList } from './SearchResultsList.js';
import { useRecommendations } from "../Reccomend.js";

// Minimum number of exercises to display at all times
const MIN_EXERCISES = 3;

// Function to create a default exercise
const createExercise = (num) => ({
  name: `Exercise ${num}`,
  sets: 1,
  reps: 1,
});

// Function to normalize exercise data
const normalizeExercise = (ex, index) => ({
  name: ex.name || `Exercise ${index + 1}`,
  sets: Number.isInteger(ex.sets) && ex.sets > 0 ? ex.sets : 1,
  reps: Number.isInteger(ex.reps) && ex.reps > 0 ? ex.reps : 1,
});

const Workouts = () => {
  // State variables for exercises, search results, recommendation, and loading/error states
  const [exercises, setExercises] = useState([]);
  const [results, setResults] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const { getRecommendations, isLoading, error } = useRecommendations();

  // Load exercises from localStorage or create default exercises
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('exercises'));
    let loadedExercises = Array.isArray(stored) ? stored.map(normalizeExercise) : [];

    if (loadedExercises.length === 0) {
      loadedExercises = Array.from({ length: MIN_EXERCISES }, (_, i) => createExercise(i + 1));
    }

    setExercises(loadedExercises);
  }, []);

  // Handle changes in exercise sets or reps
  const handleChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = parseInt(value);
    setExercises(updated);
  };

  // Handle removal of an exercise, ensuring at least MIN_EXERCISES are always present
  const handleRemove = (index) => {
    setExercises((prevExercises) => {
      let updated = prevExercises.filter((_, i) => i !== index);

      while (updated.length < MIN_EXERCISES) {
        updated.push(createExercise(updated.length + 1));
      }

      updated = updated.map((ex, i) => ({
        ...ex,
        name: ex.name.startsWith("Exercise") ? `Exercise ${i + 1}` : ex.name,
      }));
      return updated;
    });
  };

  // Add a new exercise to the workout
  const handleAddExercise = () => {
    const newExercise = {
      name: `Exercise ${exercises.length + 1}`,
      sets: 1,
      reps: 1,
    };

    const updated = [...exercises, newExercise];

    const cleaned = updated.map((ex, i) => ({
      ...ex,
      name: ex.name?.startsWith("Exercise") ? `Exercise ${i + 1}` : ex.name
    }));

    setExercises(cleaned);
  };

  // Save the workout to localStorage
  const handleSave = () => {
    const cleaned = exercises.map(normalizeExercise);
    localStorage.setItem('exercises', JSON.stringify(cleaned));
    alert('Workout saved!');
  };

  // Reset the workout to default exercises and remove from localStorage
  const handleReset = () => {
    const defaults = Array.from({ length: MIN_EXERCISES }, (_, i) => createExercise(i + 1));
    setExercises(defaults);
    localStorage.removeItem('exercises');
  };

  // Fetch workout recommendations based on weather
  const handleRecommendation = async () => {
    try {
      const result = await getRecommendations();
      setRecommendation(result);
    } catch (error) {
      
    }
  };

  // Update exercise name based on search result selection
  const updateExerciseName = (name) => {
    setExercises((prevExercises) => {
      const index = prevExercises.findIndex(ex => ex.name && ex.name.startsWith("Exercise"));
      if (index === -1) return prevExercises;
      return prevExercises.map((ex, i) =>
        i === index ? { ...ex, name: name || `Exercise ${i + 1}` } : ex
      );
    });
  };

  return (
    <div className="workouts-page">
      <div className="workoutsContainer2">
        <h1 id="title">GitFit</h1>
        <div className="dashboardButtonContainer"><NavBar /></div>
      </div>

      {/* SEARCH SECTION */}
      <div className="search-wrapper">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
        </div>
        <SearchResultsList results={results} updateExerciseName={updateExerciseName} />
      </div>

      {/* CURRENT SPLIT */}
      <h4 id="current-split" style={{ textAlign: 'center', margin: 0 }}>Current Split</h4>
      <div className="current-workout">
        {exercises.map((exercise, index) => (
          <p key={index}>
            <span className="exercise">{exercise.name}</span>
            <span className="set">Sets: </span>
            <select
              className="set"
              value={exercise.sets}
              onChange={(e) => handleChange(index, 'sets', e.target.value)}
            >
              {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="set">Reps: </span>
            <select
              className="set"
              value={exercise.reps}
              onChange={(e) => handleChange(index, 'reps', e.target.value)}
            >
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <button className="remove-button" onClick={() => handleRemove(index)}>✖</button>
          </p>
        ))}

        <button className="main-button" onClick={handleAddExercise}>+ Add Exercise</button>
        <button className="main-button" onClick={handleSave}>Save Workout</button>
        <button className="main-button" onClick={handleReset}>Reset</button>
      </div>

      {/* RECOMMENDATION SECTION */}
      <div className="reccomend">
        <button
          onClick={handleRecommendation}
          className="reccomend_button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Get New Recommendation'}
        </button>

        <h3>Recommended Workout</h3>
        {isLoading && <p>Loading recommendations...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {recommendation && !isLoading && !error && (
          <>
            <p><strong>Weather:</strong> {recommendation.weather}</p>
            <p><strong>Workout:</strong> {recommendation.recommendedWorkout}</p>
            <p><strong>Clothing:</strong> {recommendation.recommendedClothing.join(", ")}</p>
          </>
        )}
        {!recommendation && !isLoading && !error && (
          <p>Click the button above to get a recommendation.</p>
        )}
      </div>
    </div>
  );
};

export default Workouts;
