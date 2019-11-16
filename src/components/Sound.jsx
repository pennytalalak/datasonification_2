import React from "react";
import Sound from "react-sound";
import trainSound from "../sound/trainsound.mp3";

const TrainAudio = props => {
  const playStatus = props.play ? Sound.status.PLAYING : Sound.status.STOPPED;

  return (
    <Sound
      url={trainSound}
      playStatus={playStatus}
      volume={props.volumeAudio || 100}
      onLoad={() => console.log("Loaded")}
    />
  );
};

export default TrainAudio;
