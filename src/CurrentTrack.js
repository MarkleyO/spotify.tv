import React from 'react';

function CurrentTrack (props) {
  console.log(props.value);
  let track = props.value;
  let validTrack = props.value !== 'NONE'

  return (
    <div className="current-track-contents">
      {/* <h3>Presenting:</h3> */}
      <h3 className="track-name">
        {validTrack ? 
          track.name 
        : 
          ":/"
        }
      </h3>

      <div className="current-track-row">
        {validTrack ?
          track.artists.map((item, idx) =>
            <p
              key={idx}
              className="current-track-row-child"
            >
              {item.name}
              {track.artists.length>1 && idx !== track.artists.length-1 && ","}
              &nbsp;
              &nbsp;
            </p>
          )
        :
          ""
        }
      </div>

      <div className="current-track-row">
        <p>
        {validTrack ?
          track.album.name
        :
        ''
        }
        </p>
      </div>
    </div>
  );
} 

export default CurrentTrack;