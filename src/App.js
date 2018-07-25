import React, { Component } from 'react';
import {
  loadPhrase,
  playPhrase,
  stopPhrase,
  loadAndPlay,
} from './View.js';

const tonics = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const keys = [];
for (var i = 0; i < 36; i++){
  const value = i - 12;
  const name = tonics[i % 12] + (1 + Math.floor(i/12));
  keys.push({
    label: name,
    value: value,
  });
}
const domDurations = `
// vampire
// duration 0.77

3
1
3
1
3
1
4

// 2018/06/08

// 1
// 1
// 1
// 3
// 1
// 1
// 1
// 3
`;
const domChords = `
// chords for https://www.youtube.com/watch?v=lLD0Z_PRyQc&t=1m
// key B1

 0, 4, 7
-1, 4, 8
 0, 5, 9
 0, 4, 7
-1, 2, 7
 0, 4, 7
 0, 5, 9

// 2018/06/08

// 1, 5, 8, 17
// 1, 5, 8, 20
// 1, 5, 8, 17
// 1, 7, 10, 15
// 1, 6, 9, 15
// 1, 6, 9, 13
// 1, 6, 9, 15
// 1, 5, 8, 17

// reference

// I
// 0,4,7

// IV 64
// 0,5,9

// V 6
// 2,7,11

// V7
// -5,-1,2,5
`;

class App extends Component {
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
            {keys.map((key, index) => (
              <option key={"key-"+index} value={key.value}>{key.label}</option>
            ))}
          </select>
        </div>
        <div>
          duration 1 =
          <input id="speed" defaultValue={0.77}/>
          seconds
        </div>
        <textarea id="durations" defaultValue={domDurations}></textarea>
        <textarea id="chords" defaultValue={domChords}></textarea>
      </div>
    );
  }
}

export default App;
