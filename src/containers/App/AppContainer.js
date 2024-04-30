import React from "react";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import Playlist from "../../components/Playlist/Playlist";
import BlockUI from "../../components/BlockUI/BlockUI";

const AppContainer = (props) => {
    return (
        <div>
            <Header/>
            <div className="App">
                <SearchBar onSearch={props.onSearch}/>
                <div className="App-playlist">
                    <SearchResults
                        onAdd={props.onAdd}
                        searchResults={props.searchResults}
                    />
                    <Playlist
                        onRemove={props.onRemove}
                        onNameChange={props.onNameChange}
                        onSave={props.onSave}
                        playlistTracks={props.playlistTracks}
                        playlistName={props.playlistName}
                    />
                </div>
            </div>
            <BlockUI blocking={props.blocking} />
        </div>
    );
}

export default AppContainer;