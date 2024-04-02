import React from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
    return (
        <div className="SearchBar">
            <input
                placeholder="Enter A Song Title"
                onChange={this.handleTermChange}
            />
            {/* Needs to be added */ }
            <button className="SearchButton" onClick={this.search}>
                SEARCH
            </button>
        </div>
    );
}

export default SearchBar;