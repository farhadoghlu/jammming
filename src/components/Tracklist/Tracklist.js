import React from "react";
import "./Tracklist.css";
import Track from '../Track/Track'
const Tracklist = (props) => {
    return (
        <div className="TrackList">
            {props.tracks.map((track) => (
                <Track
                    key={track.id}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                    track={track}
                    isRemoval={props.isRemoval}
                />
            ))}
        </div>
    );
}

export default Tracklist;