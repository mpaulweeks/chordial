// @flow

export type Pitch = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
const chordTypes = {
  triadMajor: 'major third',
  triadMinor: 'minor third',
  triadDimished: 'dimished third',
  triadAugmented: 'augmented third',
  sevenMajor: 'major seventh',
}
export type ChordType = $Values<typeof chordTypes>;

const inversions = {
  none: 'none',
  first: 'first',
  second: 'second',
}
export type Inversion = $Values<typeof inversions>;

export type ChordConfig = {
  tonic: Pitch,
  octave: number,
  chordType: ChordType,
  inversion: Inversion,
};

export {
  chordTypes,
  inversions,
};
