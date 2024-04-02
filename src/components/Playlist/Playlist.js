import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist"

const Playlist = () => {
    return (
        <div className="Playlist">
            <input onChange={this.handleNameChange} defaultValue={"New Playlist"} />
            <Tracklist
                tracks={this.props.playlistTracks}
                isRemoval={true}
                onRemove={this.props.onRemove}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;