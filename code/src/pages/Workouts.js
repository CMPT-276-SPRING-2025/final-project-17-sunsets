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
        <h4><span className= "exercise-name">Name: Squats </span> <span className="target">Target Musculature: Quads/Glutes </span></h4>
        <p><span className= "exercise-name">Pendelum Squats</span> <span className="target">Quads/Hamstrings/Glutes</span> <Button name="Add Exercise"/></p>
        <p><span className= "exercise-name">Barbell Squats </span> <span className="target">Quads/Hamstrings/Glutes</span> <Button name="Add Exercise"/></p>
        <p><span className= "exercise-name">Leg Press</span>  <span className="target">Quads/Hamstrings/Glutes</span> <Button name="Add Exercise"/></p>

      </div>

      <br/>

      {/*Current Workout Split*/}
      <h4 id="current-split">Current Split</h4>
      <div className="current-workout">
        <p><span className='exercise'>Exercise 1</span> <span className='set'>Sets/Reps </span><Button name="Remove"/></p>
        <p><span className='exercise'>Exercise 2 Sets/Reps </span><Button name="Remove"/></p>
        <p><span className='exercise'>Exercise 3 </span><span className='set'>Sets/Reps</span> <Button name="Remove"/></p>
        <p><span className='exercise'>Exercise 4 </span><span className='set'>Sets/Reps</span> <Button name="Remove"/></p>
        <hr/>
        <Button name="Save Workout"/> <Button name="Reset"/>
      </div>
    </div>
  );
};

export default Workouts;
