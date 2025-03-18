import React from "react-router-dom"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

const SearchBar = () => {
    return( 
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Search Exercise" />
    </div>
    )
};

export default SearchBar