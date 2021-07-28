import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect, useRef } from "react";
import { ReactPlaylister } from "./components/ReactPlaylister";
import { AppFeedback } from "./components/AppFeedback";
import classNames from "classnames";

const printIndex = (index) =>{
  if (Array.isArray(index)){
    index = index.join(',');
    index = '['+index+']';
  }
  return index;
}

function App() {

  const playlisterRef = useRef();
  const inputRef = useRef();

  const [urls, setUrls] = useState([
    'https://www.youtube.com/watch?v=E11DAkrjlP8',
    [
      'https://www.youtube.com/watch?v=K5LU8K7ZK34',
      'https://soundcloud.com/i_d_magazine/premiere-sonnymoon-grains-of-friends'
    ],
    [],
    [
      'https://soundcloud.com/santigold/who-be-lovin-me-feat-ilovemakonnen',
      'https://www.youtube.com/watch?v=i0PD1nVz0kA',
      'https://www.notplayable.com',
      'https://www.youtube.com/watch?v=v3RTs0LCc-8',
    ],
    'https://www.notplayable.com',
    'https://www.notplayable.com',
    'https://www.notplayableeither.com',
    'https://www.youtube.com/watch?v=Q4zJrX5u0Bw',

  ]);

  const [playerPlaylist, setPlayerPlaylist] = useState([]);
  const [playerControls, setPlayerControls] = useState({});

  const [loop, setLoop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [autoskip, setAutoskip] = useState(true);

  const [indexesGUI, setIndexesGUI] = useState([]);//current playlist track index + source index

  const handleUpdated = (playlist,controls) => {
    console.log("APP/PLAYER PLAYLIST & CONTROLS",playlist,controls);
    setPlayerPlaylist(playlist);
    setPlayerControls(controls);
  }

  const handleGetReactPlayer = (e) => {
    e.preventDefault();
    const player = playlisterRef.current.getReactPlayer();
    console.log(player);
  }

  const handleUpdateUrls = (e) => {
    e.preventDefault();
    let arr = JSON.parse(inputRef.current.value);
    arr = arr.filter(item => item);//remove empty values
    setUrls(arr);
  }

  const trackIndex = playerControls.track_index;
  const hasPreviousTracks = playerControls?.previous_tracks?.length;
  const hasNextTracks = playerControls?.next_tracks?.length;

  const sourceIndex = playerControls.source_index;
  const hasPreviousSources = playerControls?.previous_sources?.length;
  const hasNextSources = playerControls?.next_sources?.length;

  console.log("APP RELOAD");

  return (
    <div className="App">
      <div id="intro">
        <p>
          <a href="https://github.com/gordielachance/react-playlister" target="_blank">ReactPlaylister</a> is a React component wrapper to build a playlist on top of the <a href="https://github.com/cookpete/react-player/" target="_blank">React Player</a> component.
        </p>
        <p>
          Input should be an array of "tracks".  A track can be a single URL or an array of URLs; which can be useful if one or more link is not playable.
        </p>
      </div>
      <div id="feedback">
        <div id="input">
          <h3>Input</h3>
          <textarea
          ref={inputRef}
          >
          {JSON.stringify(urls,null,2) }
          </textarea>
          <p>
            <button
            onClick={handleUpdateUrls}
            >Load</button>
          </p>
        </div>
        <div id="output">
          <h3>Feedback</h3>
          <AppFeedback
          playlist={playerPlaylist}
          controls={playerControls}
          />
        </div>
      </div>
      {
        playerPlaylist &&
          <div id="controls">

            <p>
              <strong>track #{trackIndex}</strong>
              <button
              onClick={(e) => playlisterRef.current.previousTrack()}
              disabled={!hasPreviousTracks}
              >Previous</button>
              <button
              onClick={(e) => playlisterRef.current.nextTrack()}
              disabled={!hasNextTracks}
              >Next</button>
            </p>

            <p>
              <strong>source #{sourceIndex}</strong>
              <button
              onClick={(e) => playlisterRef.current.previousSource()}
              disabled={!hasPreviousSources}
              >Previous</button>
              <button
              onClick={(e) => playlisterRef.current.nextSource()}
              disabled={!hasNextSources}
              >Next</button>
            </p>

            <p>
              <strong>loop</strong>
              <span>{loop ? 'true' : 'false'}</span>
              <button
              onClick={(e) => setLoop(!loop)}
              >toggle</button>
            </p>

            <p>
              <strong>playing</strong>
              <span>{playing ? 'true' : 'false'}</span>
              <button
              onClick={(e) => setPlaying(!playing)}
              >toggle</button>
            </p>

            <p>
              <strong>autoskip</strong>
              <span>{autoskip ? 'true' : 'false'}</span>
              <button
              onClick={(e) => setAutoskip(!autoskip)}
              >toggle</button>
            </p>

            <p>
              <button
              onClick={handleGetReactPlayer}
              >Get ReactPlayer instance (see console)</button>
            </p>

          </div>
      }
      <ReactPlaylister
      ref={playlisterRef}
      index={[3,1]} //track index OR [track index,source index]
      urls={urls}
      playing={playing}
      loop={loop}
      autoskip={autoskip}
      onUpdated={handleUpdated}
      />
    </div>
  );
}

export default App;
