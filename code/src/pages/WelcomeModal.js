import React from 'react';
import './UserProfileModal.css'; // Reuse same styling

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Welcome to GitFit!</h2>

        <div>
          <h3>1. Add your Info</h3>
          <p>Navigate to the user icon on the left han site and enter your information their</p>

          <h3>2. Set Your Goals</h3>
          <p>In your profile section you can update the amount of steps you'd like to walk daily</p>

          <h3>3. Make your workouts</h3>
          <p>Navigate to the workouts page and create a workout catered to your needs</p>

          <h3>4. Add your local weather</h3>
          <p>Navigate to the weathers page and update your location to get local weather based workouts</p>
        </div>

        <div className="modal-buttons" style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="main-button" onClick={onClose}>Got it!</button>
        </div>

      </div>
    </div>
  );
};

export default WelcomeModal;
