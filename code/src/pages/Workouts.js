import React, { useState, useEffect } from 'react';
import './Workouts.css';
import NavBar from './NavBar.js';
import SearchBar from '../SearchBar.js';
import { SearchResultsList } from './SearchResultsList.js';
import { useRecommendations } from "../Reccomend.js";

const MIN_EXERCISES = 3;

//create blank new exercise
const createExercise = (num) => ({
  name: `Exercise ${num}`,
  sets: 1,
  reps: 1,
});


//ensure exercise data is valid
const normalizeExercise = (ex, index) => ({
  name: ex.name || `Exercise ${index + 1}`,
  sets: Number.isInteger(ex.sets) && ex.sets > 0 ? ex.sets : 1,
  reps: Number.isInteger(ex.reps) && ex.reps > 0 ? ex.reps : 1,
});

const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [results, setResults] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const { getRecommendations, isLoading, error } = useRecommendations();

  //load workout from localStorage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('exercises'));
    let loadedExercises = Array.isArray(stored) ? stored.map(normalizeExercise) : [];

    //default exercises
    if (loadedExercises.length === 0) {
      loadedExercises = Array.from({ length: MIN_EXERCISES }, (_, i) => createExercise(i + 1));
    }

    setExercises(loadedExercises);
  }, []);

  // Handles input change for sets/reps
  const handleChange = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = parseInt(value);
    setExercises(updated);
  };

  // Removes an exercise and ensures minimum of 3 remain
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

  // Adds a new exercise to the workout
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

  // Saves current workout to localStorage
  const handleSave = () => {
    const cleaned = exercises.map(normalizeExercise);
    localStorage.setItem('exercises', JSON.stringify(cleaned));
    alert('Workout saved!');
  };

  // Resets workout to default 3 exercises
  const handleReset = () => {
    const defaults = Array.from({ length: MIN_EXERCISES }, (_, i) => createExercise(i + 1));
    setExercises(defaults);
    localStorage.removeItem('exercises');
  };

  // Calls recommendation hook to get new suggestion
  const handleRecommendation = async () => {
    try {
      const result = await getRecommendations();
      setRecommendation(result);
    } catch (error) {
      
    }
  };

  return (
    <div className="workouts-page">
      <div className="workoutsContainer2">
        <h1 id="title">GitFit</h1>
        <div className="dashboardButtonContainer"><NavBar /></div>
      </div>


      <br />

      {/* Current Exercises */}
      <h2 id="current-split">Current Split</h2>
      <div className="current-workout">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
        </div>

        {/* List of exercises with dropdowns */}
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

        {/* Buttons below workout */}
        <button className="main-button" onClick={handleAddExercise}>+ Add Exercise</button>
        <button className="main-button" onClick={handleSave}>Save Workout</button>
        <button className="main-button" onClick={handleReset}>Reset</button>
      </div>

      {/* Recommendation section to display reccomendations */}
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
            <p><strong>Workout:</strong> {recommendation.recommendedWorkout.join(", ")}</p>

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
