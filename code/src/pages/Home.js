import React from 'react';
import './Home.css'; 
import SemicircleProgressBar from '../StepsGraph.js'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>GitFit</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        {/* Semicircle Progress Bar for Steps */}
        <SemicircleProgressBar value={65} text="Steps" /> 
        {/* Add other progress bars as needed */}
        <SemicircleProgressBar value={80} text="Nutrition" />
      </div>
    </div>
    
  );
};

export default Home;
