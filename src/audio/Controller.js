// @flow

import type { NoteController } from './Type';

class OscWrapper implements NoteController {
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
    const oscStart = this.audioCtx.currentTime + start;
    this.osc.start(oscStart);
    this.osc.stop(oscStart + duration);
  }
  stop(){
    this.osc.stop();
  }
}
class MidiWrapper implements NoteController {
  midiSounds: any;
  step: number;

  constructor(midiSounds: any, step: number) {
    this.midiSounds = midiSounds;
    this.step = step;
  }
  play(start: number, duration: number){
    const midiStart = this.midiSounds.contextTime() + start;
    const midiStep = this.step + 60; // todo confirm match osc
    this.midiSounds.playChordAt(midiStart, 3, [midiStep], duration);
  }
  stop(){
    this.midiSounds.cancelQueue();
  }
}

class _Controller {
  audioCtx: AudioContext;
  midiInstruments: Array<number>;
  midiSounds: ?any;

  constructor() {
    this.audioCtx = new AudioContext();
    this.midiInstruments = [3];
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
  playMidi(step: number, start: number, duration: number){
    const newMidi = new MidiWrapper(this.midiSounds, step);
    newMidi.play(start, duration);
    return newMidi;
  }
  play(step: number, start: number, duration: number){
    if (this.midiSounds){
      return this.playMidi(step, start, duration);
    }
    return this.playOsc(step, start, duration);
  }
}

const ControllerSingleton = new _Controller();
export default ControllerSingleton;
