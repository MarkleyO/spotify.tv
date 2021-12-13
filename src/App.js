import './App.css';
import Dropdown from './Dropdown';
import Tracklist from './Tracklist';
import VideoPlayer from './VideoPlayer';
import CurrentTrack from './CurrentTrack';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Credentials } from './Credentials';
import videoPlaceholder from './assets/vhs_static.gif';

function App() {

  const spotify = Credentials();

  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({currentTrack: 'NONE', listOfTracksInPlaylist: []});
  const [videodata, setVideodata] = useState({currentVideodata: ''});
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then (tokenResponse => {
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/browse/categories/latin/playlists?country=US', {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (playlistResponse => {
        setPlaylists({
          selectedPlaylist: playlists.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      });

    });

  }, [playlists.selectedPlaylist, spotify.ClientId, spotify.ClientSecret]);

  function playlistChanged(val){
    if(val === 'Select Channel...'){
      setPlaylists({
        selectedPlaylist: '',
        listOfPlaylistFromAPI: playlists.listOfPlaylistFromAPI
      })
      setTracks({
        currentTrack: 'NONE',
        listOfTracksInPlaylist: []
      })
      return;
    }

    setPlaylists({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlists.listOfPlaylistFromAPI
    })

    axios(`https://api.spotify.com/v1/playlists/${val}/tracks`, {
      method: 'GET',
      headers: {'Authorization' : 'Bearer ' + token}
    })
    .then (trackResponse => {
      setTracks({
        currentTrack: trackResponse.data.items[0].track,
        listOfTracksInPlaylist: trackResponse.data.items
      })
    })

    setCurrentlyPlaying(false);
    setPlaylistIndex(0);

  }

  function activatePlaylist () {
    var currentTrack = tracks.listOfTracksInPlaylist[playlistIndex].track
    var queryString = currentTrack.artists[0].name + " - " + currentTrack.name

    console.log("Requesting: " + queryString + "...");

    axios(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${queryString}&type=video&key=AIzaSyDIb848ghg9eIMC2zwjPpDLLJ9hX8lkaao`, {
      method: 'GET'
    })
    .then (videoResponse => {
      setVideodata({
        currentVideodata: videoResponse.data.items[0].id.videoId
      })
      setTracks({
        currentTrack: tracks.listOfTracksInPlaylist[playlistIndex].track,
        listOfTracksInPlaylist: tracks.listOfTracksInPlaylist
      })
      setCurrentlyPlaying(true);
    })

  }

  function nextTrack () {

    if ( playlistIndex < tracks.listOfTracksInPlaylist.length -1) {

      var currentTrack = tracks.listOfTracksInPlaylist[playlistIndex + 1].track
      var queryString = currentTrack.artists[0].name + " - " + currentTrack.name

      axios(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${queryString}&type=video&key=AIzaSyDIb848ghg9eIMC2zwjPpDLLJ9hX8lkaao`, {
        method: 'GET'
      })
      .then (videoResponse => {
        setVideodata({
          currentVideodata: videoResponse.data.items[0].id.videoId
        })
        setTracks({
          currentTrack: tracks.listOfTracksInPlaylist[playlistIndex + 1].track,
          listOfTracksInPlaylist: tracks.listOfTracksInPlaylist
        })
        setPlaylistIndex(playlistIndex + 1);
      })
    
    } else {
      setCurrentlyPlaying(false);
      setPlaylistIndex(0);
      setVideodata({
        currentVideodata: ''
      })
      setTracks({
        currentTrack: tracks.listOfTracksInPlaylist[0].track,
        listOfTracksInPlaylist: tracks.listOfTracksInPlaylist
      })
    }
  }

  return (
    <div className="App">
      
      <Dropdown
        label="Playlist: "
        options={playlists.listOfPlaylistFromAPI}
        selectedValue={playlists.selectedPlaylist}
        changed={playlistChanged}
      />

      <div className="main-row">
        <div className="main-window">
          {/*TV Static Image*/}
          
          <img
            className="static-image"
            src={videoPlaceholder}
            alt="vhs static gif"
            width="1080"
            height="720"
          />
          <h1 className="title">SPOTIFY.TV</h1>
          <div className="video-container">
            {playlists.selectedPlaylist &&
              <VideoPlayer
                selected={tracks.currentTrack}
                onComplete={nextTrack}
                onClick={activatePlaylist}
                active={currentlyPlaying}
                current={videodata.currentVideodata}
              />
            }
          </div>
        </div>
      </div>

      <div className="outer-info-row">
        <div className="inner-info-row">
          <div className="info-subsection track">
            <CurrentTrack value={tracks.currentTrack}/>
          </div>
          <div className="info-subsection list">
            <Tracklist
              values={tracks.listOfTracksInPlaylist}
              activeIndex={playlistIndex}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

/*
Testing Information
  Playlist
    Name:     ProjectTestPlaylist
    ID:       5kxuBwv22tUrGpmtT5P1xb
  Tracks:
    1:
      Name / Artist:      Lil Yachty - Flex Up (feat. Future & Playboi Carti)
      ID:                 5Ryu0SlsYjKh78RkJUONFr
      YouTube ID:         kGV5V_VIVc8
    2:
      Name / Artist:      Lil Baby - Ready (feat. Gunna)
      ID:                 4F6yN5FsFW10Ucx7cLCzBh
      YouTube ID:         NOkBOvRi2lo
    3:
      Name / Artist:      Lil Baby - Grace (feat. 42 Dugg)
      ID:                 01JMnRUs2YOK6DDpdQASGY
      YouTube ID:         3npC_24Iq9s
*/

/*
TODO:
  - Clear tracklist switching back to home
  - Clear after finishing playlist
  - Blank square OR VideoPlayer
*/
