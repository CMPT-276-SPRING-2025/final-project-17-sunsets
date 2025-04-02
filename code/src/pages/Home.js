import React from 'react';
import './Home.css'; 
import NavBar from './NavBar.js'; // <-- Import your NavBar
import SemicircleProgressBar from '../StepsGraph.js'; 
import StepChart from "../StepsChart.js";

const Home = () => {
  return (
    <>
      <div className="workoutsContainer">
        <h1 id="title">GitFit</h1>
        <hr />

        {/* Use the NavBar here */}
        <div className="dashboardButtonContainer">
          <NavBar />
        </div>

        <hr />
      </div>

      <div className="home-container">
        <div className="step-circle-container">
        <SemicircleProgressBar text="Steps" />
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
