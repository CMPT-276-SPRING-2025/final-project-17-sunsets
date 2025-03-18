import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import SemicircleProgressBar from '../StepsGraph.js'; 
import StepChart from "../StepsChart.js";
import Button from './Button';


const Home = () => {
  return (
    <div className="home-container">
      <h1>GitFit</h1>

      <div className="dashboardButtonContainer">
        <nav>
          <ul>
            {/* Links to workout page and dashboard pages, needs styling and button components */}
            <li><Link to="/"><Button name="Dashboard"/></Link></li>
            <li><Link to="/about"><Button name="Workouts"/></Link></li>
          </ul>
        </nav>
      </div>
      
      <div className="step-circle-container">
        {}
        <SemicircleProgressBar goal={2000} text="Steps" /> 
        {/*change steps and goal for steps input*/}
      </div>
      <div className="step-graph-container">
        <h2>Weekly Steps</h2>
        <StepChart />
      </div>
    </div>
    
  );
};

export default Home;
