import React from "react";
import "./SearchResults.css";
import Tracklist from '../Tracklist/Tracklist'

const SearchResults = (props) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist
                onAdd={props.onAdd}
                isRemoval={false}
                tracks={props.searchResults}
            />
        </div>
    );
}

export default SearchResults;