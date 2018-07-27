import Context from './Context';

export default class Note {
  constructor(step) {
    this.step = step;
  }
  shiftOctave(octave) {
    this.stop();
    this.step += 12 * octave;
  }
  play(when) {
    // ensure we stop any existing oscillator
    this.stop();

    const osc = Context.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, this.step/12);
    osc.connect(Context.destination);
    osc.start(when);

    this.osc = osc;
  }
  stop(when) {
    if (this.osc){
      this.osc.stop(when);
      this.osc = null;
    }
  }
}
