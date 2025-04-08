import React from 'react'
import "./SearchResult.css"

export const SearchResults = ({result, updateExerciseName}) => {
     // Each result is clickable and sends its alias back to the parent
    return (
        <div className="search-result" onClick={() => updateExerciseName(result.alias)}>{result.alias}</div>
    )    
}
