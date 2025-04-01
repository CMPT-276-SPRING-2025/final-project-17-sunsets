import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({ goal, text }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay();
  const currentDay = dayNames[currentDayIndex];

  // State for today's steps and the input field.
  const [steps, setSteps] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // On mount, load the weekly data from local storage.
  useEffect(() => {
    const storedWeekly = localStorage.getItem('weeklySteps');
    let weeklySteps = storedWeekly 
      ? JSON.parse(storedWeekly) 
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    // Check if the stored "lastUpdatedDay" is not the current day.
    const lastUpdatedDay = localStorage.getItem('lastUpdatedDay');

if (lastUpdatedDay !== currentDay) {
  localStorage.setItem('lastUpdatedDay', currentDay);

  if (currentDay === 'Mon') {
    // If it's Monday, reset all 7 days
    const resetWeek = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };
    localStorage.setItem('weeklySteps', JSON.stringify(resetWeek));
    setSteps(0); // reset Monday steps too
  } else {
    // If it's not Monday, leave the rest — just reset today
    weeklySteps[currentDay] = 0;
    localStorage.setItem('weeklySteps', JSON.stringify(weeklySteps));
    setSteps(0);
  }
} else {
  // If same day, just load the current value
  setSteps(weeklySteps[currentDay]);
}

  }, [currentDay]);

  // Calculate the percentage for the progress bar.
  const value = goal > 0 ? (steps / goal) * 100 : 0;

  // When the user enters a new value, add it cumulatively to the current day's steps.
  const setStepsHelper = () => {
    const additionalSteps = Number(inputValue);
    // Only add positive values.
    const validAdditionalSteps = additionalSteps < 0 ? 0 : additionalSteps;
    const newSteps = steps + validAdditionalSteps;
    setSteps(newSteps);

    // Update weekly steps in local storage for the current day.
    const storedWeekly = localStorage.getItem('weeklySteps');
    let weeklySteps = storedWeekly 
      ? JSON.parse(storedWeekly) 
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    weeklySteps[currentDay] = newSteps;
    localStorage.setItem('weeklySteps', JSON.stringify(weeklySteps));
    
    // Optionally, clear the input after adding.
    setInputValue('');
  };

  const style = {
    path: { stroke: '#1f1a1a' },
    trail: { stroke: '#d6d6d6' },
    text: { fill: '#1f1a1a', fontSize: '16px' },
  };

  const buttonStyle = {
    backgroundColor: "black",
    fontSize: "15px",
    color: "white",
    padding: "0 20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "0 10px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    height: "40px",
    marginLeft: "10px",
  };

  return (
    <div style={{ width: '100%', height: '250px', margin: '40px', position: 'relative' }}>
      <div style={{ transform: 'rotate(270deg)', width: '100%', height: '100%' }}>
        <CircularProgressbar
          value={value}
          styles={style}
          strokeWidth={10}
          circleRatio={0.5}
        />
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
      <span style={{ fontSize: '16px', color: '#1f1a1a', fontWeight: 'bold' }}>
        {text} {Math.round(value)}%
      </span>

      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={setStepsHelper}>
          Add Steps for {currentDay}
        </button>
      </div>
    </div>
  );
};

export default SemicircleProgressBar;