import React, { Component } from 'react';
import MIDISounds from 'midi-sounds-react';

import Controller from './audio/Controller';
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
    this.chords = [{
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
    ].map(config => new PresetChord(config));
    this.functions = [majorFunctions, minorFunctions].map(
      funcList => funcList.map(
        fc => new DiatonicFunction(root, fc)
      )
    );
  }
  componentDidMount() {
    Controller.setMidiSounds(this.midiSounds);
  }
  stopAll = () => {
    this.chords.forEach(c => {
      c.stop();
    });
    this.functions.forEach(
      fl => fl.forEach(
        df => df.chord.stop()
      )
    );
  }
  onChordClick = (chord: BaseChord) => {
    this.stopAll();
    chord.play(0, 1);
  }
  onFunctionClick = (df: DiatonicFunction) => {
    this.stopAll();
    df.chord.play(0, 1);
  }
  render() {
    const {
      chords,
      functions,
    } = this;

    const midiClick = () => {
      this.midiSounds.playChordNow(3, [60, 64, 67, 70], 2.5);
    }
    return (
      <div>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[3]} />
        <div>
          <button onClick={ midiClick }>midi test</button>
        </div>
        <ButtonRow>
          {chords.map((chord, ci) => (
            <ChordButton key={'cb-'+ci} chord={chord} callback={this.onChordClick} />
          ))}
        </ButtonRow>
        {functions.map((fl, fli) => (
          <ButtonRow key={'fl-' + fli}>
            {fl.map((df, dfi) => (
              <DiatonicFunctionButton key={'df-'+dfi} df={df} callback={this.onFunctionClick} />
            ))}
          </ButtonRow>
        ))}
      </div>
    );
  }
}

export default App;
