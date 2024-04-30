import React, {useState} from "react";
import Swal from "sweetalert2";
import BlockUI from "../BlockUI/BlockUI";
import "./App.css";

import AppContainer from "../../containers/App/AppContainer";

import { search, savePlaylist } from "../../utils/Spotify"

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [playlistName, setPlaylistName] = useState("Playlist Name");
    const [blocking, setBlocking] = useState(false);

    const popupMessage = (title, message, icon) => {
        Swal.fire(title, message, icon);
    }

    const toggleBlocking = () => {
        setBlocking( !blocking );
    }

    const searchOnSpotify = async (term) => {
        if (term.trim() === "") {
            popupMessage("Warning!", "Enter a search term.", "warning");
        } else {
            setBlocking(true); // Toggle blocking before the asynchronous call

            const response = await search(term);

            setBlocking(false); // Toggle blocking before the asynchronous call

            if (!response) return;
            else if (response.length === 0)
                popupMessage("Error!", `No results found for: ${term}.`, "error");
            else setSearchResults( response );
        }
    }

    const addTrack = (track) => {
        if (
            playlistTracks.find((savedTrack) => savedTrack.id === track.id)
        ) {
            return;
        }
        //Track not found in PLaylist

        //Array copy
        let newPlaylistTrack = [...playlistTracks];
        newPlaylistTrack.push(track);
        setPlaylistTracks( newPlaylistTrack );
    };

    const removeTrack = (track) => {
        const newPlaylistTrack = playlistTracks.filter(
            (savedTrack) => savedTrack.id !== track.id
        );
        setPlaylistTracks( newPlaylistTrack );
    }

    const updatePlaylistName = (newName) => {
        setPlaylistName( newName );
    }

    const handleSavePlaylistButton = async () => {
        const tracksUris = playlistTracks.map((track) => track.uri);
        const noTracks = tracksUris.length === 0;
        const noPlaylistName = playlistName.trim() === "";

        if (!noTracks && !noPlaylistName) {
            setBlocking(true); // Toggle blocking before the asynchronous call

            await savePlaylist(playlistName, tracksUris); // This line seems to be calling savePlaylist again

            setBlocking(false); // Toggle blocking after the asynchronous call

            setPlaylistName("Playlist Name");
            setPlaylistTracks([]);
            popupMessage("Saved!", "Playlist saved to your account.", "success");
        } else {
            if (noPlaylistName)
                popupMessage(
                    "Warning!",
                    "Choose a name for your playlist.",
                    "warning"
                );
            else if (noTracks)
                popupMessage("Warning!", "Add some tracks first.", "warning");
            else
                popupMessage("Warning!", "Create your playlist first.", "warning");
        }
    }


    // We don't render JSX in stateful components. We send JSX to stateless components.
    return (
        <AppContainer
            onSearch={searchOnSpotify}
            onAdd={addTrack}
            searchResults={searchResults}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={handleSavePlaylistButton}
            playlistTracks={playlistTracks}
            playlistName={playlistName}
            blocking={blocking}
        />
    );
}

export default App;
