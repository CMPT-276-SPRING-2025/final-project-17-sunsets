import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import SemicircleProgressBar from '../StepsGraph.js'; 
import StepChart from "../StepsChart.js";
import Button from './Button';


const Home = () => {
  return (
    <>
      <div className="workoutsContainer">
        <h1 id="title">GitFit</h1>
        <hr />

        <div className="dashboardButtonContainer">
          <nav>
            <ul>
              <li><Link to="/"><Button name="Dashboard" /></Link></li>
              <li><Link to="/about"><Button name="Workouts" /></Link></li>
            </ul>
          </nav>
        </div>
        <hr />
      </div>

      <div className="home-container">
        <div className="step-circle-container">
          <SemicircleProgressBar goal={2000} text="Steps" />
        </div>
        <div className="step-graph-container">
          <h2>Weekly Steps</h2>
          <StepChart />
        </div>
      </div>
    </>
  );
};

export default Home;
