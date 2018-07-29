import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      octave: -1,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      inversion: inversions.second,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[3],
    additional: {
      octave: -1,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      inversion: inversions.first,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[4],
    additional: {
      octave: -1,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
  },
].map(obj => new DiatonicFunction(obj.tonic, obj.config, obj.additional));

export default {
  dfs,
}

