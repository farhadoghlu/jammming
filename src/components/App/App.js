import React, {useState} from "react";
import "./App.css";

import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

const App = () => {
    const [tracks, setTracks] = useState([]);

    const searchOnSpotify = (term) => {
        search(term).then(tracks => {
            setTracks((tracks));
        })
    }
    return (
        <div>
            <Header/>
            <div className="App">
                <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                    <SearchResults
                        searchResults={this.state.searchResults}
                        onAdd={this.addTrack}
                    />
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onNameChange={this.updatePlaylistName}
                        onRemove={this.removeTrack}
                        onSave={this.savePlaylist}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
