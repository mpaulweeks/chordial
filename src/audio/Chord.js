// @flow

import type {
  ChordConfig,
} from './Type';
import {
  chordTypes,
  inversions,
} from './Type';
import Note from './Note';

class BaseChord {
  notes: Array<Note>;

  constructor(){
    this.notes = [];
  }
  play(when: number) {
    this.notes.forEach(note => {
      note.play(when);
    });
  }
  stop(when: number) {
    this.notes.forEach(note => {
      note.stop(when);
    });
  }
}

export class PresetChord extends BaseChord {
  constructor(config: ChordConfig){
    super();
    const {
      tonic,
      octave,
      chordType,
      inversion,
    } = config;

    let pitches;
    switch (chordType) {
      case chordTypes.triadMajor:
        pitches = [0, 4, 7];
        break;
      case chordTypes.triadMinor:
        pitches = [0, 3, 7];
        break;
      case chordTypes.triadDimished:
        pitches = [0, 3, 6];
        break;
      case chordTypes.triadAugmented:
        pitches = [0, 4, 8];
        break;
      case chordTypes.sevenMajor:
        pitches = [0, 4, 7, 10];
        break;
      default:
        pitches = [0];
    }

    const notes = pitches.map(p => new Note(p + tonic));
    notes.forEach(n => n.shiftOctave(octave));
    switch (inversion) {
      case inversions.first:
        notes[1].shiftOctave(-1);
        notes[2].shiftOctave(-1);
        break;
      case inversions.second:
        notes[2].shiftOctave(-1);
        break;
      default:
        // do nothing
    }

    this.notes = notes;
  }
}

export class ManualChord extends BaseChord {
  constructor(steps: Array<number>, tonic: number) {
    super();
    this.notes = steps.map((step: number) => {
      return new Note(tonic + step);
    });
  }
}
