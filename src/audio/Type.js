// @flow

export type PlatonicPitch = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
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
  root: PlatonicPitch,
  chordType: ChordType,
  inversion: Inversion,
};

export type FunctionConfig = {
  roman: string,
  pitchOffset: number,
  chordType: ChordType,
};

export {
  chordTypes,
  inversions,
};
