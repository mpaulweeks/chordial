import React, { Component } from 'react';

import {
  chordTypes,
  inversions,
} from './audio/Type';
import { PresetChord, BaseChord } from './audio/Chord';
import DiatonicFunction, { majorFunctions, minorFunctions } from './audio/DiatonicFunction';

import {
  ChordButton,
  DiatonicFunctionButton,
  ButtonRow,
} from './view/Component';

class App extends Component {
  constructor() {
    super();
    const root = 3;
    this.chords = [
      {
        root: root + 0,
        chordType: chordTypes.triadMajor,
        inversion: inversions.second,
      },
      {
        root: root + 5,
        chordType: chordTypes.triadMajor,
        inversion: inversions.first,
      },
      {
        root: root - 5,
        chordType: chordTypes.sevenDominant,
        inversion: inversions.none,
      },
    ].map(config =>  new PresetChord(config));
    this.functions = [...majorFunctions, ...minorFunctions].map(fc => {
      return new DiatonicFunction(root, fc);
    });
  }
  stopAll = () => {
    this.chords.forEach(c => {
      c.stopNow();
    });
    this.functions.forEach(f => {
      f.chord.stopNow();
    })
  }
  onChordClick = (chord: BaseChord) => {
    this.stopAll();
    chord.playShort();
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.stopAll();
    df.chord.playShort();
  }
  render() {
    const {
      chords,
      functions,
    } = this;
    return (
      <div>
        <ButtonRow>
          {chords.map((chord, index) => (
            <ChordButton key={ 'cb-'+index } chord={ chord } callback={ this.onChordClick } />
          ))}
        </ButtonRow>
        <ButtonRow>
          {functions.map((df, index) => (
            <DiatonicFunctionButton key={ 'df-'+index } df={ df } callback={ this.onFunctionClick } />
          ))}
        </ButtonRow>
      </div>
    );
  }
}

export default App;
