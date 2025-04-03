import React from 'react'
import "./SearchResult.css"

export const SearchResults = ({result, updateExerciseName}) => {
    return (
        <div className="search-result" onClick={() => updateExerciseName(result.alias)}>{result.alias}</div>
    )    
}
