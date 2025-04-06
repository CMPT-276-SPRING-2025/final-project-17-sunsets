import React from "react-router-dom";
import propTypes from 'prop-types'


const Button = (props) => {
    

  //styling of button
  const styles = {
    backgroundColor: "black",
    fontSize: "15px",
    color: "white",
    padding: "10px 20px",
    borderRadius: "25px",
    border: "none",
    cursor: "pointer"
  }

  return (
    //custom styling and trigger onClick when clicked
    <button style={styles} onClick={props.onClick}>
      {props.name}
    </button>
  );
}

Button.propTypes = {
    name: propTypes.string,
    onClick: propTypes.func 
  };
  
  // Setting Default Properties
  Button.defaultProps = {
    name: "Button",
    onClick: () => {} 
  };

export default Button;