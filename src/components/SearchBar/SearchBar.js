import React, {useState} from "react";
import SearchBarContainer from "../../containers/SearchBar/SearchBarContainer";


const SearchBar = (props) => {
    const [term, setTerm] = useState("");

    const handleTermChange = ({ target }) => {
        setTerm(target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        props.onSearch(term);
    }

    return (
        <SearchBarContainer
            handleTermChange={handleTermChange}
            handleSearchSubmit={handleSearchSubmit}
        />
    );
}

export default SearchBar;