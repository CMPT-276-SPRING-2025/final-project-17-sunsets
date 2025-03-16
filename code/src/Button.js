import React from "react-router-dom";
import propTypes from 'prop-types'

const Button = (props) => {

    {/* INLINE CSS to Style Button */}
    const styles = {
        backgroundColor: "black",
        color: "white",
        padding: "10px, 20px",
        borderRadius: "25px",
        border: "none",
        cursor: "pointer"
    }

    return (
        <div> 
            <button style={styles}>{props.name}</button>
        </div>
    )
}

{/*Setting Property types */}
Button.propTypes = {
    name: propTypes.string
}

{/*Setting Default Properties*/}
Button.defaultProps = {
    name: "Button"
}

export default Button;