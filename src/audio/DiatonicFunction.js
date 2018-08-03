// @flow

import type {
  FunctionConfig,
} from './Type';
import {
  keyModes,
  chordTypes,
  inversions,
  checkKeyIsSharp,
  convertStepToPitch,
} from './Type';
import { PresetChord } from './Chord';

function parseNum(value: any, defValue?: number){
  if (value === 0){
    return 0;
  }
  return parseFloat(value || defValue);
}
function presetToConfig(obj: Object): FunctionConfig {
  return {
    tonic: parseNum(obj.tonic, 3),
    pitchOffset: parseNum(obj.pitchOffset),
    keyMode: obj.keyMode,
    roman: obj.roman,
    minorNonLeading: !!obj.minorNonLeading,
    chordType: obj.chordType,
    octave: parseNum(obj.octave, 4),
    inversion: obj.inversion || inversions.none,
  };
}

const majorFunctions: Array<FunctionConfig> = [
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
  {
    keyMode: keyModes.major,
    roman: 'v',
    pitchOffset: 7,
    chordType: chordTypes.sevenDominant,
  },
].map(presetToConfig);
const minorFunctions: Array<FunctionConfig> = [
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
].map(presetToConfig);
export {
  majorFunctions,
  minorFunctions,
};

const DF_SPLITTER = '-';
const configKeys = [
  'tonic',
  'pitchOffset',
  'keyMode',
  'roman',
  'minorNonLeading',
  'octave',
  'chordType',
  'inversion',
];

export default class DiatonicFunction {
  config: FunctionConfig;
  chord: PresetChord;

  constructor(config: FunctionConfig){
    this.config = config;

    const chordConfig = {
      root: config.tonic + config.pitchOffset,
      octave: config.octave,
      chordType: config.chordType,
      inversion: config.inversion,
    }
    this.chord = new PresetChord(chordConfig);
  }
  static fromRoughConfig(newConfig: Object){
    const cleaned = presetToConfig(newConfig);
    return new DiatonicFunction(cleaned);
  }


  static fromSerialized(serial: string) {
    const parts = serial.split(DF_SPLITTER);
    const config = {};
    configKeys.forEach((k, i) => {
      let v = parts[i];
      config[k] = v.length ? v : undefined;
    });
    return DiatonicFunction.fromRoughConfig(config);
  }
  toSerialized() {
    return configKeys
      .map(k => {
        const value = this.config[k];
        if (value === false){
          return '';
        }
        if (value === true){
          return 1;
        }
        return value;
      })
      .join(DF_SPLITTER)
  }

  getFunctionRole() {
    const {
      tonic,
      keyMode,
      roman,
      minorNonLeading,
      chordType,
      octave,
      inversion,
    } = this.config;
    let isSharp = checkKeyIsSharp(tonic);

    let tonicSymbol = convertStepToPitch(tonic, isSharp).letter;
    switch (keyMode) {
      case keyModes.major:
        tonicSymbol = tonicSymbol.toUpperCase();
        break;
      case keyModes.minor:
        tonicSymbol = tonicSymbol.toLowerCase();
        break;
      default:
        tonicSymbol = '???';
    }

    let chordSymbol = roman;
    let superScript = '';
    switch (chordType) {
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
      case chordTypes.sevenDominant:
        chordSymbol = chordSymbol.toUpperCase();
        superScript = '7';
        break;
      default:
        chordSymbol = '???';
    }
    if (minorNonLeading){
      chordSymbol = '♭' + chordSymbol;
    }

    let inversionText = '';
    switch (inversion) {
      case inversions.none:
        inversionText = '';
        break;
      case inversions.first:
        inversionText = '6';
        break;
      case inversions.second:
        inversionText = '6 4';
        break;
      case inversions.third:
        inversionText = '4 2';
        break;
      default:
        inversionText = '?';
    }

    const chordNoteLetters = this.chord
      .sortNotesWithInversion()
      .map(n => n.getPitch(isSharp).letter);

    return {
      tonicSymbol: tonicSymbol,
      octave: octave,
      chordSymbol: chordSymbol,
      superScript: superScript,
      inversionText: inversionText,
      notes: chordNoteLetters,
    }
  }
}
