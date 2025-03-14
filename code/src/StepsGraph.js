import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({ value, text }) => {
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

  return (
    <div style={{ width: '250px', height: '250px', margin: '20px', transformOrigin: 'center',}}>
      <CircularProgressbar
        value={value}
        text={`${text} ${value}%`}
        styles={style}
        strokeWidth={10}
        rotation={180}  
        circleRatio={1} /*change to 0.5 for semericle. I cant flip the semicircle the right way currently*/
      />
    </div>
  );
};

export default SemicircleProgressBar;