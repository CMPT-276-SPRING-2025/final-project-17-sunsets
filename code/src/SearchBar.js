import React, {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

const SearchBar = () => {
    const [input, setInput] = useState("") //Create a stateful variable to hold user data

    const fetchData = (value) => ( // Fetches data from the wger REST API (Does not require authentication for this feauture)
        fetch("https://wger.de/api/v2/exercisealias/?limit=30")
        .then((response) => response.json()) // After the API call, convert the response to .JSON format
        .then((json) => {
            const results = json.results.filter((exercise) => {
                return exercise && exercise.alias && exercise.alias.toLowerCase().includes(value) 
            })
            console.log(results)
        })
    )

    const handeChange = (value) => { // This function handles changing the input variable and sending the input to the API
        setInput(value)
        fetchData(value)
    }

    return( 
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Search Exercise" value={input} onChange={(e) => handeChange(e.target.value)} />
    </div>
    )
};

export default SearchBar