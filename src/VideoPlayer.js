import React from 'react';
import PlayButton from './PlayButton';
import YouTube from 'react-youtube';

function VideoPlayer (props) {

  const opts = {
    width: '1080',
    height: '720',
    playerVars: {
      autoplay: 1,
    }
  };

  if(props.active){
    return (
      <div className="loaded-video-container">
          <YouTube videoId={props.current} opts={opts} onEnd={props.onComplete}/>
      </div>
    )
  } else {
    return (
      <div className="play-button-container">
        <PlayButton clicked={props.onClick}/>
      </div>
    )
  }

}

export default VideoPlayer;