// @flow

import { ManualChord } from './Chord';

export class Phrase {
  tonic: number;
  phraseSteps: Array<Array<number>>;
  durations: Array<number>;
  chords: Array<ManualChord>;

  constructor(tonic: number, phraseSteps: Array<Array<number>>, durations: Array<number>) {
    this.tonic = tonic;
    this.phraseSteps = phraseSteps;
    this.durations = durations;
    this.chords = [];
  }
  play() {
    this.stop();

    this.chords = this.phraseSteps.map(chordSteps => {
      return new ManualChord(chordSteps, this.tonic);
    });

    let start = 0;
    this.chords.forEach((chord, ci) => {
      const duration = this.durations[ci % this.durations.length];
      const stop = start + duration;
      chord.playAt(start);
      chord.stopAt(stop);
      start = stop;
    });
  }
  stop() {
    this.chords.forEach(chord => {
      chord.stopNow();
    });
  }
}
