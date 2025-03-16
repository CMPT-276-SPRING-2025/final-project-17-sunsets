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
            {/* Links to workout page and dashboard pages, needs styling and button components */}
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/">Workouts</Link></li>
          </ul>
        </nav>
      </div>
      <hr></hr>

      {/*Search Bar*/}
      <div className="search-bar-container">
        <div>SearchBar</div>
        <div>SearchResults</div>
      </div>

  
    </div>
  );
};

export default Workouts;
