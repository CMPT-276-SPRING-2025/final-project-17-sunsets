import React from 'react'
import "./SearchResultsList.css"
import { SearchResults } from './SearchResult.js'

//components to render a list of search results
export const SearchResultsList = ({results}) => {
    return (
    //conntainer div for list of results
    <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResults result={result} key={id}/>
                })
            }

        </div>
    )
}