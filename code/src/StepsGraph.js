
import React, { useState }  from 'react'; 
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SemicircleProgressBar = ({goal, text }) => {
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

  const setStepsHelper = () => {

    const value = Number(inputValue);
    if (value < 0) {
      setSteps(0); 
    } 
    else {
      setSteps(value); 
    }
  
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
      <div style={{ marginTop: '10px' }}>
        <button onClick={setStepsHelper}>Enter Steps</button>

        <input
          type="number"
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

    </div>
  );
};

export default SemicircleProgressBar;