import React, { Component } from 'react';
import styled from 'styled-components';
import {
  loadPhrase,
  playPhrase,
  stopPhrase,
  loadAndPlay,
} from './view/LegacyView';
import Defaults from './Defaults.js';

const DurationInput = styled.input`
  width: 50px;
`;
const Durations = styled.textarea`
  width: 100px;
  height: 500px;
`;
const Chords = styled.textarea`
  width: 350px;
  height: 500px;
`;

class Beta extends Component {
  componentDidMount(){
    loadPhrase();
  }
  render() {
    return (
      <div>
        <div>
          <button id="load" onClick={loadPhrase}>load</button>
          <button id="load-play" onClick={loadAndPlay}>load and play</button>
          <button id="play" onClick={playPhrase}>play</button>
          <button id="stop" onClick={stopPhrase}>stop</button>
        </div>
        <br/>
        <div>
          choose your key:
          <select id="key" defaultValue={-10}>
            {Defaults.keys.map((key, index) => (
              <option key={"key-"+index} value={key.value}>{key.label}</option>
            ))}
          </select>
        </div>
        <div>
          duration 1 =
          <DurationInput id="speed" defaultValue={0.77}/>
          seconds
        </div>
        <Durations id="durations" defaultValue={Defaults.durations}></Durations>
        <Chords id="chords" defaultValue={Defaults.chords}></Chords>
      </div>
    );
  }
}

export default Beta;
