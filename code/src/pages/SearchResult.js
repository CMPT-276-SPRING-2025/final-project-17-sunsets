import React from 'react'
import "./SearchResult.css"

export const SearchResults = ({result}) => {
    return (
        <div className="search-result" onClick={(e) => alert(`You clicked on ${result.alias}`)}>{result.alias}</div>
    )    
}
