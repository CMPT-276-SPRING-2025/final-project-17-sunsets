import React, { useState, useEffect } from 'react';
import './Workouts.css';
import NavBar from './NavBar.js';
import SearchBar from '../SearchBar.js';
import Button from "../Button.js";
import Weather from './Weather.js';
import { SearchResultsList } from './SearchResultsList.js';
import { useRecommendations } from "../Reccomend.js"; 

const Workouts = () => {
  // Recommendation state and handler
  const [recommendation, setRecommendation] = useState(null);
  const { getRecommendations, isLoading, error } = useRecommendations(); // Using the hook
  const [results, setResults] = useState([]);

  const handleRecommendation = async () => { 
    try {
      const result = await getRecommendations();
      setRecommendation(result);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <div className="workoutsContainer">
      <h1 id="title">GitFit</h1>
      <hr />

      <div className="dashboardButtonContainer">
        <NavBar />
      </div>
      <hr />
      
      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results}/>
      </div>

      {/* Workouts Listings */}
      <div className="workouts-list">
        <h4>
          <span className="exercise-name">Name: Squats</span>
          <span className="target">Target Musculature: Quads/Glutes</span>
        </h4>
        <p>
          <span className="exercise-name">Pendelum Squats</span>
          <span className="target">Quads/Hamstrings/Glutes</span>
          <Button name="Add Exercise" />
        </p>
        <p>
          <span className="exercise-name">Barbell Squats</span>
          <span className="target">Quads/Hamstrings/Glutes</span>
          <Button name="Add Exercise" />
        </p>
        <p>
          <span className="exercise-name">Leg Press</span>
          <span className="target">Quads/Hamstrings/Glutes</span>
          <Button name="Add Exercise" />
        </p>
      </div>

      <br />

      {/* Current Workout Split */}
      <h4 id="current-split">Current Split</h4>
      <div className="current-workout">
        <p>
          <span className="exercise">Exercise 1</span>
          <span className="set">Sets/Reps</span>
          <Button name="Remove" />
        </p>
        <p>
          <span className="exercise">Exercise 2</span>
          <span className="set">Sets/Reps</span>
          <Button name="Remove" />
        </p>
        <p>
          <span className="exercise">Exercise 3</span>
          <span className="set">Sets/Reps</span>
          <Button name="Remove" />
        </p>
        <p>
          <span className="exercise">Exercise 4</span>
          <span className="set">Sets/Reps</span>
          <Button name="Remove" />
        </p>
        <hr />
        <Button name="Save Workout" /> <Button name="Reset" />
      </div>

      {/* Recommendation Section */}
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