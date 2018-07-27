// @flow

export interface NoteController {
  play(number, number): any, // todo null
  stop(): any,
};

const keyModes = {
  major: 'major mode',
  minor: 'minor mode',
};
export type KeyMode = $Values<typeof keyModes>;

type RomanNumeral = 'i' | 'ii' | 'iii' | 'iv' | 'v' | 'vi' | 'vii';

export type Pitch = {
  letter: number,
  octave: number,
};

const chordTypes = {
  triadMajor: 'major triad',
  triadMinor: 'minor triad',
  triadDiminished: 'dimished triad',
  triadAugmented: 'augmented triad',
  sevenDominant: 'dominant seventh',
};
export type ChordType = $Values<typeof chordTypes>;

const inversions = {
  none: 'none',
  first: 'first',   // 6
  second: 'second', // 6 4
  third: 'third',   // 4 2
};
export type Inversion = $Values<typeof inversions>;

export type ChordConfig = {
  root: number,
  chordType: ChordType,
  inversion: Inversion,
};

export type FunctionConfig = {
  keyMode: KeyMode,
  roman: RomanNumeral,
  minorNonLeading: ?boolean,
  pitchOffset: number,
  chordType: ChordType,
};

const sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const flats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
function convertStepToPitch(step: number, isSharp: ?boolean){
  let adjustedStep = step;
  let octave = 4;
  while (adjustedStep < 0){
    adjustedStep += 12;
    octave -= 1;
  }
  while (adjustedStep >= 12){
    adjustedStep -= 12;
    octave += 1;
  }
  adjustedStep %= 12;
  return {
    letter: isSharp ? sharps[adjustedStep] : flats[adjustedStep],
    octave: octave,
  };
}

export {
  keyModes,
  chordTypes,
  inversions,
  convertStepToPitch,
};
