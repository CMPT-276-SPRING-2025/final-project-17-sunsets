import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({ goal, text }) => {
  const [steps, setSteps] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const value = (steps / goal) * 100;

  const style = {
    path: {
      stroke: '#1f1a1a',
    },
    trail: {
      stroke: '#d6d6d6',
    },
    text: {
      fill: '#1f1a1a',
      fontSize: '16px',
    },
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

  const setStepsHelper = () => {
    const value = Number(inputValue);
    if (value < 0) {
      setSteps(0);
    } else {
      setSteps(value);
    }
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
          {`${text} ${Math.round(value)}%`}
        </span>
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', alignItems: 'center' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={inputStyle}
        />
        <button style={buttonStyle} onClick={setStepsHelper}>Enter Steps</button>
      </div>
    </div>
  );
};

export default SemicircleProgressBar;