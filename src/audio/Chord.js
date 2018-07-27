import Note from './Note';

class BaseChord {
  constructor(){
    this.notes = [];
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

export class ManualChord extends BaseChord {
  constructor(steps, tonic) {
    super();
    tonic = tonic || 0;
    this.notes = steps.map(step => {
      return new Note(tonic + step);
    });
  }
}
