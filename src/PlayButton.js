import React from 'react';
import PlayImage from './assets/play.png';
import PlayImageAlt from './assets/play_green.png';

function PlayButton (props) {

  return (
    <button className="start-playlist-button" onClick={props.clicked} >
      <div className="button-image alt-image">
        <img
          src={PlayImageAlt}
          alt="play button"
          width="134"
          height="42"
        />
      </div>
      <div className="button-image cover-image">
        <img
          src={PlayImage}
          alt="play button"
          width="134"
          height="42"
        />
      </div>
    </button>
  );
  
}

export default PlayButton;