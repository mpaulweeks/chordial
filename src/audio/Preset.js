import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    base: majorFunctions[0],
    transpose: {
      octave: 3,
    },
  },
  {
    base: majorFunctions[0],
    transpose: {
      octave: 4,
    },
  },
  {
    base: majorFunctions[0],
    transpose: {
      octave: 5,
    },
  },
  {
    base: majorFunctions[0],
    transpose: {
      inversion: inversions.first,
    },
  },
  {
    base: majorFunctions[3],
    transpose: {
      octave: 3,
    },
  },
  {
    base: majorFunctions[0],
    transpose: {
      inversion: inversions.second,
    },
  },
  {
    base: majorFunctions[4],
    transpose: {
      octave: 3,
    },
  },
  {
    base: majorFunctions[7],
    transpose: {
      octave: 3,
      inversion: inversions.third,
    },
  },
  {
    base: majorFunctions[0],
    transpose: {
      inversion: inversions.first,
    },
  },
].map(obj => {
  const mergedConfig = {
    ...obj.base,
    ...obj.transpose,
  }
  return DiatonicFunction.fromRoughConfig(mergedConfig);
});

export default {
  dfs,
}

