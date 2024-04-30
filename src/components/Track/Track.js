import React from "react";
import 'boxicons'
import "./Track.css";

const Track = (props) => {
    const addTrack = () => {
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        props.onRemove(props.track);
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
            <button
                onClick={props.isRemoval ? removeTrack : addTrack}
                className="Track-action"
            >
                {props.isRemoval ? (
                    <box-icon name="minus-circle"
                              color="white"
                              animation="flashing-hover">
                    </box-icon>
                ) : (
                    <box-icon name="plus-circle"
                              color="white"
                              animation="flashing-hover">
                    </box-icon>
                )}
            </button>
        </div>
    );
}

export default Track;
