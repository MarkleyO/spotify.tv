import React from 'react';
/*
Component should query Spotify for a list of playlists upon loading / initialization.
*/

function Dropdown (props){

  const dropdownChanged = e => {
    props.changed(e.target.value);
  }

  return (
    <div className='playlistDropdown'>
      {/* <label>{props.label}</label> */}
      <select value={props.selectedValue} onChange={dropdownChanged}>
        <option key={0}>Select Channel...</option>
        <option key={1} value={'5kxuBwv22tUrGpmtT5P1xb'}>ProjectTestPlaylist</option>
        <option key={2} value={'4bpSaQ19ytzcEUbwdoE6gk'}>Christmas</option>
        {props.options.map((item, idx) =>
          <option
            key={idx + 1}
            value={item.id}
          >
            {"CH " + (idx+1) + ": " + item.name}
          </option>)
        }
      </select>
    </div>
  );
}

export default Dropdown;