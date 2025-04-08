/**
 * SearchResultsList Component
 * ---------------------------
 * Displays a list of search results by mapping over the results array
 * and rendering a SearchResults component for each.
 * 
 * Props:
 * - results (array): An array of result objects, each with an `alias` field.
 * - updateExerciseName (function): A callback function that updates the
 *   selected exercise name when a result is clicked.
 * 
 */
import React from 'react'
import "./SearchResultsList.css"
import { SearchResults } from './SearchResult.js'

export const SearchResultsList = ({results, updateExerciseName}) => {
    return (
    <div className="results-list">
         {/* Map through each result and render a SearchResults component */}
            {
                results.map((result, id) => {
                    return <SearchResults result={result} updateExerciseName={updateExerciseName} key={id}/>
                })
            }

        </div>
    )
}