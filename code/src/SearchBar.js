import React, {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

const SearchBar = () => {
    const [input, setInput] = useState("") //Create a stateful variable to hold user data

    const fetchData = (value) => (
        fetch("https://wger.de/api/v2/exercise/")
    )

    return( 
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Search Exercise" value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
    )
};

export default SearchBar