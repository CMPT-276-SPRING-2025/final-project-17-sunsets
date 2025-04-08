/**
 * WelcomeModal Component
 * -----------------------
 * A modal that provides a brief guide to new users about the app's features and functionality.
 * The modal provides step-by-step instructions on how to:
 * 1. Add user information
 * 2. Set step goals
 * 3. Create workouts
 * 4. Add local weather data for personalized workouts
 * 
 * Props:
 * - onClose (function): A callback function to close the modal
 * 
 */
import React from 'react';
import './UserProfileModal.css'; // Reuse same styling

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Welcome to GitFit!</h2>

        <div>
          <h3>1. Add Your Info</h3>
          <p>Click the user icon on the left-hand side and enter your information there.</p>

          <h3>2. Set Your Goals</h3>
          <p>In your profile section, you can update the number of steps you'd like to walk daily.</p>

          <h3>3. Create Your Workouts</h3>
          <p>Navigate to the Workouts page and create a workout tailored to your needs.</p>

          <h3>4. Add Your Local Weather</h3>
          <p>Navigate to the Weather page and update your location to get weather-based workout suggestions.</p>
        </div>

        {/* Close button */}
        <div className="modal-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="main-button" onClick={onClose}>Got it!</button>
        </div>
        
      </div>
    </div>
  );
};

export default WelcomeModal;
