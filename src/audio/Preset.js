import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      octave: 3,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      octave: 4,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      octave: 5,
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
    config: majorFunctions[3],
    additional: {
      octave: 3,
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
    config: majorFunctions[4],
    additional: {
      octave: 3,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[7],
    additional: {
      octave: 3,
      inversion: inversions.third,
    },
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    additional: {
      inversion: inversions.first,
    },
  },
].map(obj => new DiatonicFunction(obj.tonic, obj.config, obj.additional));

export default {
  dfs,
}

