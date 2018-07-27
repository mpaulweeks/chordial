// @flow

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
  roman: RomanNumeral,
  minorNonLeading: ?boolean,
  pitchOffset: number,
  chordType: ChordType,
};

export {
  chordTypes,
  inversions,
};
