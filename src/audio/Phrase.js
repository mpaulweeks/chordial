import { ManualChord } from './Chord';

export class Phrase {
  constructor(tonic, phraseSteps, durations) {
    this.tonic = tonic;
    this.phraseSteps = phraseSteps;
    this.durations = durations;
    this.chords = null;
  }
  play() {
    if (this.chords){
      this.stop();
    }
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
    if (this.chords){
      this.chords.forEach(chord => {
        chord.stopNow();
      });
    }
  }
}
