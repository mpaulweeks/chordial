// @flow

import Context from './Context';
import { convertStepToPitch } from './Type';

export default class Note {
  step: number;
  osc: ?any;

  constructor(step: number) {
    this.step = step;
  }
  shiftOctave(octave: number) {
    this.stopAt(0);
    this.step += 12 * octave;
  }
  playAt(offset: number) {
    // ensure we stop any existing oscillator
    this.stopNow();

    const osc = Context.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, this.step/12);
    osc.connect(Context.destination);

    osc.start(Context.currentTime + offset);
    this.osc = osc;
    window.osc = osc;
  }
  stopAt(offset: number) {
    if (this.osc){
      this.osc.stop(Context.currentTime + offset);
      if (offset <= 0){
        // don't cleanup until its definitely done
        this.osc = null;
      }
    }
  }
  playNow() {
    this.playAt(0);
  }
  stopNow() {
    this.stopAt(0);
  }
  playShort(duration: ?number) {
    this.playNow();
    this.stopAt(duration || 1);
  }
  getPitch(isSharp: ?boolean) {
    return convertStepToPitch(this.step, isSharp);
  }
}
