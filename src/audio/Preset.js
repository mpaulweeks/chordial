import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

//?df=3-0-ma-i--3-tma-0&df=3-0-ma-i--4-tma-1&df=3-5-ma-iv--3-tma-0&df=3-0-ma-i--4-tma-2&df=3-7-ma-v--3-tma-0&df=3-7-ma-v--3-7do-0&df=3-4-ma-iii--4-tmi-1

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

