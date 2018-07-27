import Context from './Context';

export default class Note {
  constructor(step) {
    this.step = step;
    const osc = Context.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, step/12);
    osc.connect(Context.destination);
    this.osc = osc;
  }
  play(when) {
    this.osc.start(when);
  }
  stop(when) {
    this.osc.stop(when);
  }
}
