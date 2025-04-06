import React from 'react'
import "./SearchResultsList.css"
import { SearchResults } from './SearchResult.js'

export const SearchResultsList = ({results, updateExerciseName}) => {
    return (
    <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResults result={result} updateExerciseName={updateExerciseName} key={id}/>
                })
            }

        </div>
    )
}