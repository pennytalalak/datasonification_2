import React, { useState } from "react";
import Sound from "react-sound";
import trainSound from "../sound/trainsound.mp3";

const BeepAudio = props => {
  const [play, setPlay] = useState(true);

  const playStatus = play ? Sound.status.PLAYING : Sound.status.STOPPED;

  return (
    <Sound
      url={trainSound}
      playStatus={Sound.status.PLAYING}
      volume={props.volumeAudio || 100}
      onLoad={() => console.log("Loaded")}
    />
  );
};

export default BeepAudio;
