import {
  inversions,
} from './Type';
import DiatonicFunction, { majorFunctions } from './DiatonicFunction';

const dfs = [
  {
    tonic: 3,
    config: majorFunctions[0],
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    inversion: inversions.second,
  },
  {
    // todo pass octave, maybe as chord config?
    tonic: 3,
    config: majorFunctions[3],
  },
  {
    tonic: 3,
    config: majorFunctions[0],
    inversion: inversions.first,
  },
  {
    tonic: 3,
    config: majorFunctions[4],
    inversion: inversions.none,
  },
  {
    tonic: 3,
    config: majorFunctions[0],
  },
].map(obj => new DiatonicFunction(obj.tonic, obj.config, obj.inversion));

export default {
  dfs,
}

