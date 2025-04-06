import React, {useState} from "react"
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"

const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("") //Create a stateful variable to hold user data

    const fetchData = (value) => ( // Fetches data from the wger REST API (Does not require authentication for this feauture)
        fetch("https://wger.de/api/v2/exercisealias/?limit=30")
        .then((response) => response.json()) // After the API call, convert the response to .JSON format
        .then((json) => {
            const results = json.results.filter((exercise) => { // Get the results from the .JSON data and filter them (filtering on frontend)
                return value && exercise && exercise.alias && exercise.alias.toLowerCase().includes(value) // Check these values for conditional rendering of the search results
            })
            setResults(results)
        })
    )

    const handeChange = (value) => { // This function handles changing the input variable and sending the input to the API
        setInput(value)
        fetchData(value.toLowerCase())
    }

    return( 
    <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input placeholder="Search Exercise" value={input} onChange={(e) => handeChange(e.target.value)} />
    </div>
    )
};

export default SearchBar