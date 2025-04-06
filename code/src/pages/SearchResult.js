import React from 'react'
import "./SearchResult.css"

export const SearchResults = ({result, updateExerciseName}) => {
    return (
<<<<<<< HEAD
        <div className="search-result" onClick={() => updateExerciseName(result.alias)}>{result.alias}</div>
=======
        // Render a styled div showing the result alias
        // When clicked, it triggers an alert with the alias
        <div className="search-result" onClick={(e) => alert(`You clicked on ${result.alias}`)}>{result.alias}</div>
>>>>>>> formating_code
    )    
}
