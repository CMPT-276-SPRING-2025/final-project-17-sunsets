import React from 'react'
import "./SearchResultsList.css"
import { SearchResults } from './SearchResult.js'

export const SearchResultsList = ({results}) => {
    return (
    <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResults result={result} key={id}/>
                })
            }

        </div>
    )
}