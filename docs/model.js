const audioCtx = new AudioContext();

class Note {
  constructor(step) {
    this.step = step;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = 440 * Math.pow(2, step/12);
    osc.connect(audioCtx.destination);
    this.osc = osc;
  }
  play(when) {
    this.osc.start(when);
  }
  stop(when) {
    this.osc.stop(when);
  }
}

class Chord {
  constructor(steps, tonic, duration) {
    tonic = tonic || 0;
    this.notes = steps.map(step => {
      return new Note(tonic + step);
    });
    this.duration = duration;
  }
  play(when) {
    this.notes.forEach(note => {
      note.play(when);
    });
  }
  stop(when) {
    this.notes.forEach(note => {
      note.stop(when);
    });
  }
}

class Phrase {
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
    this.chords = this.phraseSteps.map((chordSteps, ci) => {
      return new Chord(chordSteps, this.tonic, this.durations[ci % this.durations.length]);
    });

    let start = audioCtx.currentTime;
    this.chords.forEach(chord => {
      const stop = start + chord.duration;
      chord.play(start);
      chord.stop(stop);
      start = stop;
    });
  }
  stop() {
    if (this.chords){
      this.chords.forEach(chord => {
        chord.stop();
      });
    }
  }
}
