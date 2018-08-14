// @flow

import WebAudioFontPlayer from 'webaudiofont';
import audioFont from './Font';
import type { NoteController } from './Type';
import Unlock from './Unlock';

class OscWrapper implements NoteController {
  audioCtx: AudioContext;
  osc: OscillatorNode;

  constructor(audioCtx: AudioContext, step: number) {
    const osc = audioCtx.createOscillator();
    const oscStep = step - 60;
    osc.frequency.value = 440 * Math.pow(2, oscStep/12);
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
    this.midiStep = step + 9;  // todo confirm match osc
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
  useMidi: boolean;

  constructor() {
    const AudioContextFunc = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContextFunc();
    const midiPlayer = new WebAudioFontPlayer();
    midiPlayer.adjustPreset(audioCtx, audioFont);

    this.audioCtx = audioCtx
    this.audioFont = audioFont;
    this.midiPlayer = midiPlayer;
    this.useMidi = !window.location.search.includes('osc');
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
    // todo https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
    Unlock(this.audioCtx);
    if (this.useMidi){
      return this.playMidi(step, start, duration);
    }
    return this.playOsc(step, start, duration);
  }
}

const ControllerSingleton = new _Controller();
export default ControllerSingleton;
