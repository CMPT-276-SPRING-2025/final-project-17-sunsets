import React, {useState} from 'react';
import './Workouts.css';
import NavBar from './NavBar'; // <-- Import your NavBar component
import SearchBar from '../SearchBar';
import Button from "../Button";

const Workouts = () => {

  const [results, setResults] = useState([]) // Hold results for Searchbar
  
  return (
    <div className="workoutsContainer">
      <h1 id="title">GitFit</h1>
      <hr />

      {/* Reusable NavBar */}
      <div className="dashboardButtonContainer">
        <NavBar />
      </div>
      <hr />

      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
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
    </div>
  );
};

export default Workouts;
