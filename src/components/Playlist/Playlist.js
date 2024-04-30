import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = (props) => {
    const handleNameChange = (e) => {
        const name = e.target.value;
        props.onNameChange(name);
    }

    return (
        <div className="Playlist">
            <input
                value={props.playlistName}
                onChange={handleNameChange}
                placeholder="Playlist name"
            />
            <Tracklist
                onRemove={props.onRemove}
                isRemoval={true}
                tracks={props.playlistTracks}
            />
            <button onClick={props.onSave} className="Playlist-save">
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;
