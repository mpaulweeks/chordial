// @flow

export interface NoteController {
  play(number, number): any, // todo null
  stop(): any,
};

export type Option = {
  label: string,
  value: any,
};
function toOption(obj: Object): Array<Option>{
  return Object.keys(obj).map(key => ({
    label: key,
    value: obj[key],
  }));
}
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
  octave: number,
  chordType: ChordType,
  inversion: Inversion,
};

export type FunctionConfig = {
  keyMode: KeyMode,
  roman: RomanNumeral,
  minorNonLeading?: boolean,
  pitchOffset: number,
  chordType: ChordType,
};

const sharpKeys = ['C', 'G', 'D', 'A', 'E', 'B'];
const flatKeys = ['F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
const sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const flats = ['A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'];
function checkKeyIsSharp(step: number){
  const s = convertStepToPitch(step, true);
  return sharpKeys.includes(s.letter);
}
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
function convertPitchToStep(letter: string){
  const sharpsIndex = sharps.indexOf(letter);
  if (sharpsIndex >= 0){
    return sharpsIndex;
  }
  return flats.indexOf(letter);
}
function getAllKeys(){
  const allKeys = [];
  for (var i = 0; i < 12; i++) {
    let letter;
    const shortIndex = Math.floor(i / 2);
    if (i % 2 === 0) {
      letter = sharpKeys[shortIndex];
    }
    else {
      letter = flatKeys[shortIndex];
    }
    allKeys.push({
      letter: letter,
      step: convertPitchToStep(letter),
    });
  }
  return allKeys;
}

export {
  toOption,
  keyModes,
  chordTypes,
  inversions,
  checkKeyIsSharp,
  convertStepToPitch,
  getAllKeys,
};
