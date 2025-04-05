import React from 'react';
import './Home.css'; 
import NavBar from './NavBar.js'; 
import SemicircleProgressBar from '../StepsGraph.js'; 
import StepChart from "../StepsChart.js";

//home component
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
