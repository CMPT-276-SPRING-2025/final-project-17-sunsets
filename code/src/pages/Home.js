import React from 'react';
import './Home.css'; 
import { Link } from 'react-router-dom';
import SemicircleProgressBar from '../StepsGraph.js'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>GitFit</h1>

      <div className="dash-button-container ">
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/about">Workouts</Link></li>
            </ul>
          </nav>
      
      </div>
      
      <div className="step-graph-container">
        {}
        <SemicircleProgressBar value={65} text="Steps" /> 
  
      </div>
    </div>
    
  );
};

export default Home;
