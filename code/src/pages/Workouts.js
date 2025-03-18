import React from 'react';
import './Workouts.css'
import SearchBar from '../SearchBar';
import { Link } from "react-router-dom"
import Button from "../Button"


const Workouts = () => {
  return (
    <div className="workoutsContainer">
      <h1 id="title">GitFit</h1>
      <hr></hr>

      <div className="dashboardButtonContainer">
        <nav>
          <ul>
            {/* Links to workout page and dashboard pages, needs styling and button components */}
            <li><Link to="/"><Button name="Dashboard"/></Link></li>
            <li><Link to="/about"><Button name="Workouts"/></Link></li>
          </ul>
        </nav>
      </div>
      <hr></hr>

      {/*Search Bar*/}
      <div className="search-bar-container">
        <SearchBar/>
      </div>

      {/*Workouts Listings*/}
      <div className="workouts-list">
        <h4>Name: Squats Target Musculature: Quads/Glutes </h4>
        <p>Pendelum Squats Quads/Hamstrings/Glutes <Button name="Add Exercise"/></p>
        <p>Barbell Squats Quads/Hamstrings/Glutes <Button name="Add Exercise"/></p>
        <p>Leg Press Quads/Hamstrings/Glutes <Button name="Add Exercise"/></p>

      </div>

      <br/>

      {/*Current Workout Split*/}
      <h4 id="current-split">Current Split</h4>
      <div className="current-workout">
        <p>Exercise 1 Sets/Reps <Button name="Remove"/></p>
        <p>Exercise 2 Sets/Reps <Button name="Remove"/></p>
        <p>Exercise 3 Sets/Reps <Button name="Remove"/></p>
        <p>Exercise 4 Sets/Reps <Button name="Remove"/></p>
        <hr/>
        <Button name="Save Workout"/> <Button name="Reset"/>
      </div>
    </div>
  );
};

export default Workouts;
