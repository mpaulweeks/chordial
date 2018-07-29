
import type { FunctionConfig } from './Type';
import {
  keyModes,
  chordTypes,
  inversions,
  checkKeyIsSharp,
  convertStepToPitch,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    tonic: 0,
    config: majorFunctions[0],
  },
  {
    tonic: 0,
    config: majorFunctions[3],
  },
  {
    tonic: 0,
    config: majorFunctions[4],
  },
].map(obj => new DiatonicFunction(obj.tonic, obj.config));

export default {
  dfs,
}

