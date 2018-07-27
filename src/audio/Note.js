// @flow

import Context from './Context';

const sharps = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const flats = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

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
  getPitch(isSharp: boolean) {
    let adjustedStep = this.step;
    let octave = 4;
    while (adjustedStep < 0){
      adjustedStep += 12;
      octave -= 1;
    }
    while (adjustedStep >= 12){
      adjustedStep -= 12;
      octave += 1;
    }
    adjustedStep %= 12;
    return {
      letter: isSharp ? sharps[adjustedStep] : flats[adjustedStep],
      octave: octave,
    };
  }
}
