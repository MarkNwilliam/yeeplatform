import React from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AudioPlayer = ({ audioUrl }) => {
  return (
    <div>
      <H5AudioPlayer
        autoPlay={false}
        src={audioUrl}
        onPlay={(e) => console.log("onPlay")}
        // Other props here
      />
    </div>
  );
};

export default AudioPlayer;
