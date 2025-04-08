/**
 * Button.js
 * 
 * A reusable styled button component for GitFit.
 * 
 * Props:
 * - name (string): The text to display inside the button. Default is "Button".
 * - onClick (function): Callback function when button is clicked. Default is an empty function.
 * 
 * Styling:
 * - Black background, white text
 * - Rounded corners (pill-style)
 * - Slight padding and pointer cursor on hover
 * 
 * Notes:
 * - Uses PropTypes for type checking and default props.
 */
import React from "react-router-dom";
import propTypes from 'prop-types'


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

    return (
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