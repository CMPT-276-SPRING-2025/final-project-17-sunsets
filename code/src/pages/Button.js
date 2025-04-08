import React from "react-router-dom";
import propTypes from 'prop-types'

//defined button component
const Button = (props) => {
  

  const styles = {
      backgroundColor: "black",
      fontSize: "15px",
      color: "white",
      padding: "10px 20px",
      borderRadius: "25px",
      border: "none",
      cursor: "pointer"
  }
  //onclick behaviour
  return (
      <button style={styles} onClick={props.onClick}>
        {props.name}
      </button>
    );
}

//expected prop type
Button.propTypes = {
    name: propTypes.string,
    onClick: propTypes.func 
  };
  
  Button.defaultProps = {
    name: "Button",
    onClick: () => {} 
  };

export default Button;