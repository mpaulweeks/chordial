import type { FunctionConfig } from './Types';
import { chordTypes, inversions } from './Type';
import { PresetChord } from './Chord';

const majorFunctions = [
  {
    roman: 'i',
    pitchOffset: 0,
    chordType: chordTypes.triadMajor,
  },
  {
    roman: 'ii',
    pitchOffset: 2,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'iii',
    pitchOffset: 4,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'iv',
    pitchOffset: 5,
    chordType: chordTypes.triadMajor,
  },
  {
    roman: 'v',
    pitchOffset: 7,
    chordType: chordTypes.triadMajor,
  },
  {
    roman: 'vi',
    pitchOffset: 9,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'vii',
    pitchOffset: 11,
    chordType: chordTypes.triadDiminished,
  },
];
const minorFunctions = [
  {
    roman: 'i',
    pitchOffset: 0,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'ii',
    pitchOffset: 2,
    chordType: chordTypes.triadDiminished,
  },
  {
    roman: 'iii',
    pitchOffset: 3,
    chordType: chordTypes.triadMajor,
  },
  {
    roman: 'iv',
    pitchOffset: 5,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'v',
    pitchOffset: 7,
    chordType: chordTypes.triadMinor,
  },
  {
    roman: 'vi',
    pitchOffset: 8,
    chordType: chordTypes.triadMajor,
  },
  {
    roman: 'vii',
    pitchOffset: 10,
    chordType: chordTypes.triadMajor,
  },
];
export {
  majorFunctions,
  minorFunctions,
};

export default class DiatonicFunction {
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
    let symbol = this.config.roman;
    let superScript = '';
    switch (this.config.chordType) {
      case chordTypes.triadMajor:
        symbol = symbol.toUpperCase();
        break;
      case chordTypes.triadMinor:
        symbol = symbol.toLowerCase();
        break;
      case chordTypes.triadDiminished:
        symbol = symbol.toLowerCase();
        superScript = 'o';
        break;
      case chordTypes.triadAugmented:
        symbol = symbol.toUpperCase();
        superScript = '+';
        break;
      default:
        symbol = '???';
    }
    return {
      symbol: symbol,
      superScript: superScript,
    }
  }
}