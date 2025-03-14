import React from 'react';
import './Home.css'; 
import SemicircleProgressBar from '../StepsGraph.js'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>GitFit</h1>

      

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        {}
        <SemicircleProgressBar value={65} text="Steps" /> 
  
      </div>
    </div>
    
  );
};

export default Home;
