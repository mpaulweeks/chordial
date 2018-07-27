// @flow

class OscWrapper {
  audioCtx: AudioContext;
  osc: OscillatorNode;

  constructor(audioCtx: AudioContext, step: number) {
    const osc = audioCtx.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, step/12);
    osc.connect(audioCtx.destination);

    this.audioCtx = audioCtx;
    this.osc = osc;
  }
  play(start: number, duration: number){
    this.osc.start(this.audioCtx.currentTime + start);
    this.osc.stop(this.audioCtx.currentTime + start + duration);
  }
  stop(){
    this.osc.stop();
  }
}

class _Controller {
  audioCtx: AudioContext;
  midiSounds: ?any;

  constructor() {
    this.audioCtx = new AudioContext();
    this.midiSounds = null;
  }
  setMidiSounds(midiSounds: any) {
    this.midiSounds = midiSounds;
  }
  playOsc(step: number, start: number, duration: number){
    const newOsc = new OscWrapper(this.audioCtx, step);
    newOsc.play(start, duration);
    return newOsc;
  }
  play(step: number, start: number, duration: number){
    return this.playOsc(step, start, duration);
  }
}

const ControllerSingleton = new _Controller();
export default ControllerSingleton;
