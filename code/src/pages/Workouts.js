import React from 'react';
import './Workouts.css'
import { Link } from "react-router-dom"


const Workouts = () => {
  return (
    <div className="workoutsContainer">
      <h1>GitFit</h1>
      <hr></hr>

      <div className="dashboardButtonContainer">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/">Workouts</Link></li>
          </ul>
        </nav>
      </div>
      <hr></hr>

      <p>
        sample text
      </p>

  
    </div>
  );
};

export default Workouts;
