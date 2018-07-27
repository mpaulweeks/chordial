// @flow

import Context from './Context';

export default class Note {
  step: number;
  osc: ?any;

  constructor(step: number) {
    this.step = step;
  }
  shiftOctave(octave: number) {
    this.stop();
    this.step += 12 * octave;
  }
  play(when: ?number) {
    // ensure we stop any existing oscillator
    this.stop();

    const osc = Context.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, this.step/12);
    osc.connect(Context.destination);
    osc.start(when || Context.currentTime);

    this.osc = osc;
  }
  stop(when: ?number) {
    if (this.osc){
      this.osc.stop(when || Context.currentTime);
      this.osc = null;
    }
  }
}
