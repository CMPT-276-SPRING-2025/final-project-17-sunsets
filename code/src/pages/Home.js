/**
 * Home Component
 * --------------
 * This is the main homepage for the GitFit app.
 * It includes:
 * - A title and navigation bar
 * - A semicircle step progress indicator
 * - A weekly steps graph
 *
 * Components Used:
 * - NavBar: Navigation bar for app pages
 * - SemicircleProgressBar: Shows current step count progress
 * - StepChart: Displays a chart of weekly step counts
 */

import React from 'react';
import './Home.css'; 
import NavBar from './NavBar.js'; 
import SemicircleProgressBar from '../StepsGraph.js'; 
import StepChart from "../StepsChart.js";

// Functional Home component
const Home = () => {
  return (
    <>
      <div className="workoutsContainer2">
        <h1 id="title">GitFit</h1>


        <div className="dashboardButtonContainer">
          <NavBar />
        </div>

    
      </div>

      <div className="home-container">
        <div className="step-circle-container">
          <SemicircleProgressBar text="Steps:" />
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
