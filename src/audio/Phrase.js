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
      chord.play(start, duration);
      start += duration;
    });
  }
  stop() {
    this.chords.forEach(chord => {
      chord.stop();
    });
  }
}
