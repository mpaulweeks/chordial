// @flow

import type { FunctionConfig } from './Type';
import {
  keyModes,
  chordTypes,
  inversions,
  convertStepToPitch,
} from './Type';
import { PresetChord } from './Chord';

const majorFunctions = [
  {
    keyMode: keyModes.major,
    roman: 'i',
    pitchOffset: 0,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.major,
    roman: 'ii',
    pitchOffset: 2,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.major,
    roman: 'iii',
    pitchOffset: 4,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.major,
    roman: 'iv',
    pitchOffset: 5,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.major,
    roman: 'v',
    pitchOffset: 7,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.major,
    roman: 'vi',
    pitchOffset: 9,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.major,
    roman: 'vii',
    pitchOffset: 11,
    chordType: chordTypes.triadDiminished,
  },
];
const minorFunctions = [
  {
    keyMode: keyModes.minor,
    roman: 'i',
    pitchOffset: 0,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'ii',
    pitchOffset: 2,
    chordType: chordTypes.triadDiminished,
  },
  {
    keyMode: keyModes.minor,
    roman: 'iii',
    pitchOffset: 3,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'iv',
    pitchOffset: 5,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'v',
    minorNonLeading: true,
    pitchOffset: 7,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'vi',
    minorNonLeading: true,
    pitchOffset: 8,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'vii',
    minorNonLeading: true,
    pitchOffset: 10,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'v',
    pitchOffset: 7,
    chordType: chordTypes.triadMajor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'vi',
    pitchOffset: 9,
    chordType: chordTypes.triadMinor,
  },
  {
    keyMode: keyModes.minor,
    roman: 'vii',
    pitchOffset: 11,
    chordType: chordTypes.triadDiminished,
  },
];
export {
  majorFunctions,
  minorFunctions,
};

export default class DiatonicFunction {
  config: FunctionConfig;
  tonic: number;
  chord: PresetChord;

  constructor(tonic: number, config: FunctionConfig){
    this.config = config;
    this.tonic = tonic;
    this.chord = new PresetChord({
      root: tonic + config.pitchOffset,
      chordType: config.chordType,
      inversion: inversions.none,
    });
  }
  getFunctionRole() {
    let tonicSymbol = convertStepToPitch(this.tonic).letter;
    switch (this.config.keyMode) {
      case keyModes.major:
        tonicSymbol = tonicSymbol.toUpperCase() + ' Major';
        break;
      case keyModes.minor:
        tonicSymbol = tonicSymbol.toLowerCase() + ' minor';
        break;
      default:
        tonicSymbol = '???';
    }

    let chordSymbol = this.config.roman;
    let superScript = '';
    switch (this.config.chordType) {
      case chordTypes.triadMajor:
        chordSymbol = chordSymbol.toUpperCase();
        break;
      case chordTypes.triadMinor:
        chordSymbol = chordSymbol.toLowerCase();
        break;
      case chordTypes.triadDiminished:
        chordSymbol = chordSymbol.toLowerCase();
        superScript = 'o';
        break;
      case chordTypes.triadAugmented:
        chordSymbol = chordSymbol.toUpperCase();
        superScript = '+';
        break;
      default:
        chordSymbol = '???';
    }
    if (this.config.minorNonLeading){
      chordSymbol = '♭' + chordSymbol;
    }

    return {
      tonicSymbol: tonicSymbol,
      chordSymbol: chordSymbol,
      superScript: superScript,
    }
  }
}