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
  player: WebAudioFontPlayer;
  midiStep: number;

  constructor(audioCtx: AudioContext, step: number) {
    const player = new WebAudioFontPlayer();
    player.adjustPreset(audioCtx, audioFont);

    this.audioCtx = audioCtx;
    this.player = player;
    this.audioFont = audioFont;
    this.midiStep = step + 60;  // todo confirm match osc
  }
  play(start: number, duration: number){
    this.player.queueWaveTable(
      this.audioCtx,
      this.audioCtx.destination,
      this.audioFont,
      this.audioCtx.currentTime + start,
      this.midiStep,
      duration
    );
  }
  stop(){
    this.player.cancelQueue(this.audioCtx);
  }
}

class _Controller {
  audioCtx: AudioContext;
  useMidi: boolean;

  constructor() {
    const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContextFunc();
    this.useMidi = true;
  }
  playOsc(step: number, start: number, duration: number){
    const newOsc = new OscWrapper(this.audioCtx, step);
    newOsc.play(start, duration);
    return newOsc;
  }
  playMidi(step: number, start: number, duration: number){
    const newMidi = new MidiWrapper(this.audioCtx, step);
    newMidi.play(start, duration);
    return newMidi;
  }
  play(step: number, start: number, duration: number){
    if (this.useMidi){
      return this.playMidi(step, start, duration);
    }
    return this.playOsc(step, start, duration);
  }
}

const ControllerSingleton = new _Controller();
export default ControllerSingleton;
