import React from 'react';

function Video (props) {

  var sourceLink = 'https://www.youtube.com/embed/' + props.value;
  console.log("Rendering embedded video: " + sourceLink + "...");

  return (
    <div>
      <h2>Embedded Video:</h2>
      <iframe
        width="1280"
        height="720"
        src={sourceLink}
        title="YouTube Video Player"
        frameBorder="0"
      />
      
    </div>
  );
}

export default Video;