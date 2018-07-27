import React, { Component } from 'react';
import styled from 'styled-components';

import {
  chordTypes,
  inversions,
} from './audio/Type';
import { PresetChord } from './audio/Chord';

const Button = styled.button`
  font-size: 24px;
`;

class App extends Component {
  constructor() {
    super();
    this.chord = null;
  }
  stop = () => {
    if (this.chord){
      this.chord.stop();
    }
  }
  onClick1 = () => {
    this.stop();
    const config = {
      tonic: 3,
      octave: 0,
      chordType: chordTypes.triadMajor,
      inversion: inversions.second,
    };
    this.chord = new PresetChord(config);
    this.chord.play();
  }
  onClick2 = () => {
    this.stop();
    const config = {
      tonic: 8,
      octave: 0,
      chordType: chordTypes.triadMajor,
      inversion: inversions.first,
    };
    this.chord = new PresetChord(config);
    this.chord.play();
  }
  onClick3 = () => {
    this.stop();
    const config = {
      tonic: 10,
      octave: -1,
      chordType: chordTypes.sevenMajor,
      inversion: inversions.none,
    };
    this.chord = new PresetChord(config);
    this.chord.play();
  }
  render() {
    return (
      <div>
        hello world
        <Button onClick={this.onClick1}>I</Button>
        <Button onClick={this.onClick2}>IV</Button>
        <Button onClick={this.onClick3}>V7</Button>
      </div>
    );
  }
}

export default App;
