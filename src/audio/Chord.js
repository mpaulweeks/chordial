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
  playAt(offset: number) {
    this.notes.forEach(note => {
      note.playAt(offset);
    });
  }
  stopAt(offset: number) {
    this.notes.forEach(note => {
      note.stopAt(offset);
    });
  }
  playNow() {
    this.notes.forEach(note => {
      note.playNow();
    });
  }
  stopNow() {
    this.notes.forEach(note => {
      note.stopNow();
    });
  }
  playShort(duration: ?number) {
    this.notes.forEach(note => {
      note.playShort(duration);
    })
  }
}

export class PresetChord extends BaseChord {
  constructor(config: ChordConfig){
    super();
    const {
      root,
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
      case chordTypes.triadDiminished:
        pitches = [0, 3, 6];
        break;
      case chordTypes.triadAugmented:
        pitches = [0, 4, 8];
        break;
      case chordTypes.sevenDominant:
        pitches = [0, 4, 7, 10];
        break;
      default:
        throw Error(`invalid chord type: ${chordType}`);
    }

    const notes = pitches.map(p => new Note(p + root));

    let inversionIndex;
    switch (inversion) {
      case inversions.first:
        inversionIndex = 1;
        break;
      case inversions.second:
        inversionIndex = 2;
        break;
      case inversions.third:
        inversionIndex = 3;
        break;
      default:
        inversionIndex = null;
    }
    notes.forEach((n, index) => {
      if (inversionIndex && index >= inversionIndex){
        n.shiftOctave(-1);
      }
    });

    this.notes = notes;
  }
  getRootPitch(isSharp: ?boolean) {
    return this.notes[0].getPitch(isSharp);
  }
}

export class ManualChord extends BaseChord {
  constructor(steps: Array<number>, root: number) {
    super();
    this.notes = steps.map((step: number) => {
      return new Note(root + step);
    });
  }
}
