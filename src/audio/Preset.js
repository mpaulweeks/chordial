import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    tonic: 3,
    config: majorFunctions[0],
    inversion: inversions.none,
  },
  {
    tonic: 3,
    config: majorFunctions[3],
    inversion: inversions.none,
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    inversion: inversions.second,
  },
  {
    tonic: 3,
    config: majorFunctions[4],
    inversion: inversions.none,
  },
].map(obj => new DiatonicFunction(obj.tonic, obj.config, obj.inversion));

export default {
  dfs,
}

