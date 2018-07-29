// @flow

import WebAudioFontPlayer from 'webaudiofont';
import audioFont from './Font';
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
  audioCtx: AudioContext;
  audioFont: any;
  midiPlayer: WebAudioFontPlayer;
  midiStep: number;

  constructor(audioCtx: AudioContext, audioFont: any, midiPlayer: WebAudioFontPlayer, step: number) {
    this.audioCtx = audioCtx;
    this.audioFont = audioFont;
    this.midiPlayer = midiPlayer;
    this.midiStep = step + 60;  // todo confirm match osc
  }
  play(start: number, duration: number){
    this.midiPlayer.queueWaveTable(
      this.audioCtx,
      this.audioCtx.destination,
      this.audioFont,
      this.audioCtx.currentTime + start,
      this.midiStep,
      duration
    );
  }
  stop(){
    this.midiPlayer.cancelQueue(this.audioCtx);
  }
}

class _Controller {
  audioCtx: AudioContext;
  audioFont: any;
  midiPlayer: WebAudioFontPlayer;

  constructor() {
    const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContextFunc();
    const midiPlayer = new WebAudioFontPlayer();
    midiPlayer.adjustPreset(audioCtx, audioFont);

    this.audioCtx = audioCtx
    this.audioFont = audioFont;
    this.midiPlayer = midiPlayer;
  }
  playOsc(step: number, start: number, duration: number){
    const newOsc = new OscWrapper(this.audioCtx, step);
    newOsc.play(start, duration);
    return newOsc;
  }
  playMidi(step: number, start: number, duration: number){
    const newMidi = new MidiWrapper(this.audioCtx, this.audioFont, this.midiPlayer, step);
    newMidi.play(start, duration);
    return newMidi;
  }
  play(step: number, start: number, duration: number){
    if (this.midiPlayer){
      return this.playMidi(step, start, duration);
    }
    return this.playOsc(step, start, duration);
  }
}

const ControllerSingleton = new _Controller();
export default ControllerSingleton;