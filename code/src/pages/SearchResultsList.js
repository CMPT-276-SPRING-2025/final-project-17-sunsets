import React from 'react'
import "./SearchResultsList.css"
import { SearchResults } from './SearchResult.js'

<<<<<<< HEAD
export const SearchResultsList = ({results, updateExerciseName}) => {
=======
//components to render a list of search results
export const SearchResultsList = ({results}) => {
>>>>>>> formating_code
    return (
    //conntainer div for list of results
    <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResults result={result} updateExerciseName={updateExerciseName} key={id}/>
                })
            }

        </div>
    )
}