import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({ value, text }) => {
  const style = {
    path: {
      stroke: '#4caf50', 
    },
    trail: {
      stroke: '#d6d6d6', 
    },
    text: {
      fill: '#4caf50', 
      fontSize: '16px', 
    },
  };

  return (
    <div style={{ width: '150px', height: '150px', margin: '20px' }}>
      <CircularProgressbar
        value={value}
        text={`${text} ${value}%`}
        styles={style}
        strokeWidth={15}
        counterClockwise={true} 
      />
    </div>
  );
};

export default SemicircleProgressBar;