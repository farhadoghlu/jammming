import React from "react";
import "../../components/SearchBar/SearchBar.css";

const SearchBarContainer = (props) => {
    return (
        <div className="SearchBar">
            <form action="" className="wrapper wrapper-center" onSubmit={props.handleSearchSubmit}>
                <input
                    placeholder="Enter A Song Title"
                    onChange={props.handleTermChange}
                />
                {/* Needs to be added */}
                <button className="SearchButton" type="submit">
                    SEARCH
                </button>
            </form>
        </div>
    );
}

export default SearchBarContainer;