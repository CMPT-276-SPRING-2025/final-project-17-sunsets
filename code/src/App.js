import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import './App.css'; 


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
