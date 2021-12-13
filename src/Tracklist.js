import React from 'react';

function Tracklist (props) {

  let validList = props.values.length > 0;
  let tracks = props.values;
  console.log(tracks, props.activeIndex);

  return(
    <div>
      <h3 className="info-title">Tracklist:</h3>
        <div className="tracklist-contents">
          {validList?
            tracks.map((item, idx) =>
              <p
                key={idx+1}
                className={idx === props.activeIndex && 'selected'}
              >
                {item.track.name} - {item.track.artists[0].name}
              </p>
            )
          :
            ""
          } 
        </div>
    </div>
  );
}

export default Tracklist;