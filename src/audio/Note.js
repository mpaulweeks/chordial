// @flow

import Controller from './Controller';
import { convertStepToPitch } from './Type';

export default class Note {
  step: number;
  audio: ?any;

  constructor(step: number) {
    this.step = step;
  }
  shiftOctave(octave: number) {
    this.stop();
    this.step += 12 * octave;
  }
  play(start: number, duration: number) {
    // ensure we stop any existing oscillator
    this.stop();
    this.audio = Controller.play(this.step, start, duration);
  }
  stop() {
    if (this.audio){
      this.audio.stop();
      this.audio = null;
    }
  }
  getPitch(isSharp: ?boolean) {
    return convertStepToPitch(this.step, isSharp);
  }
}
