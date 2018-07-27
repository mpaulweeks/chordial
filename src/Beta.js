import React, { Component } from 'react';

import {
  chordTypes,
  inversions,
} from './audio/Type';
import { PresetChord, BaseChord } from './audio/Chord';

import {
  ChordButton,
  ChordRow,
} from './view/Component';

class App extends Component {
  constructor() {
    super();
    this.chords = [
      {
        tonic: 3,
        octave: 0,
        chordType: chordTypes.triadMajor,
        inversion: inversions.second,
      },
      {
        tonic: 8,
        octave: 0,
        chordType: chordTypes.triadMajor,
        inversion: inversions.first,
      },
      {
        tonic: 10,
        octave: -1,
        chordType: chordTypes.sevenMajor,
        inversion: inversions.none,
      },
    ].map(config =>  new PresetChord(config));
  }
  stopAll = () => {
    this.chords.forEach(c => {
      c.stopNow();
    });
  }
  onChordClick = (chord: BaseChord) => {
    this.stopAll();
    chord.playShort();
  }
  render() {
    const {
      chords
    } = this;
    return (
      <ChordRow>
        {chords.map((chord, index) => (
          <ChordButton key={ 'cb-'+index } chord={ chord } callback={ this.onChordClick } />
        ))}
      </ChordRow>
    );
  }
}

export default App;
