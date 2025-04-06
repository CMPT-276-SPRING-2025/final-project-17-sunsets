import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({ text }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = new Date().getDay();
  const currentDay = dayNames[currentDayIndex];

  const [steps, setSteps] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [goal, setGoal] = useState(10000); // Default fallback

  // Load goal and steps on mount
  useEffect(() => {
    const userGoal = localStorage.getItem('stepGoal');
    if (userGoal) {
      setGoal(Number(userGoal));
    }

    const storedWeekly = localStorage.getItem('weeklySteps');
    let weeklySteps = storedWeekly 
      ? JSON.parse(storedWeekly) 
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    const lastUpdatedDay = localStorage.getItem('lastUpdatedDay');

    if (lastUpdatedDay !== currentDay) {
      localStorage.setItem('lastUpdatedDay', currentDay);

      if (currentDay === 'Mon') {
        // Reset full week on Monday
        const resetWeek = {
          Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0,
        };
        localStorage.setItem('weeklySteps', JSON.stringify(resetWeek));
        setSteps(0);
      } else {
        weeklySteps[currentDay] = 0;
        localStorage.setItem('weeklySteps', JSON.stringify(weeklySteps));
        setSteps(0);
      }
    } else {
      setSteps(weeklySteps[currentDay]);
    }
  }, [currentDay]);

  // Calculate percentage
  const value = goal > 0 ? (steps / goal) * 100 : 0;

  // Step update handler
  const setStepsHelper = () => {
    const additionalSteps = Number(inputValue);
  
    const newSteps = Math.max(steps + additionalSteps, 0);
    setSteps(newSteps);

    const storedWeekly = localStorage.getItem('weeklySteps');
    let weeklySteps = storedWeekly
      ? JSON.parse(storedWeekly)
      : { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

    weeklySteps[currentDay] = newSteps;
    localStorage.setItem('weeklySteps', JSON.stringify(weeklySteps));
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
    padding: "0 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",     
    minWidth: "200px",        
  };

  const inputStyle = {
    padding: "0 10px",
    fontSize: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    height: "40px",
    width: "80px",         
    minWidth: "60px",      
    marginRight: "10px",    
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
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '58%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <span style={{ fontSize: '16px', color: '#1f1a1a', fontWeight: 'bold' }}>
          {text} {steps}
        </span>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '60%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center'
      }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={setStepsHelper}>
          Add steps to {currentDay}
        </button>
      </div>
    </div>
  );
};

export default SemicircleProgressBar;
