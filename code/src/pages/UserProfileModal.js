import React, { useState, useEffect } from 'react';
import './UserProfileModal.css';

const UserProfileModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    weight: '',
    heightFt: '',
    heightIn: '',
    gender: '',
    stepGoal: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('userProfile'));
    if (stored) setFormData(stored);
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('stepGoal', formData.stepGoal); // Sync step goal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>User Profile</h2>

        <label>Weight (lbs):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </label>

        <label>Height:</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            name="heightFt"
            value={formData.heightFt}
            placeholder="ft"
            onChange={handleChange}
            style={{ width: '50%', padding: '0.5rem' }}
          />
          <input
            type="number"
            name="heightIn"
            value={formData.heightIn}
            placeholder="in"
            onChange={handleChange}
            style={{ width: '50%', padding: '0.5rem' }}
          />
        </div>

        <label>Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="none">Rather not say</option>
          </select>
        </label>

        <label>Step Goal:
          <input
            type="number"
            name="stepGoal"
            value={formData.stepGoal}
            onChange={handleChange}
          />
        </label>

        <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button className="main-button" onClick={handleSave}>Save</button>
          <button className="main-button" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default UserProfileModal;
