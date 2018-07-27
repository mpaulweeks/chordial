import Note from './Note';

// type ChordConfig {
//   tonic: Number,
//   octave: Number,
//   type: string, // major third, minor third, major seventh
//   inversion: string, // none, first, second
// };

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

export class PresetChord extends BaseChord {
  constructor(config){
    super();

    let pitches = [0];
    switch (config.type) {
      case 'majorThird':
        pitches = [0, 4, 7];
        break;
      case 'minorThird':
        pitches = [0, 3, 7];
        break;
      case 'diminishedThird':
        pitches = [0, 3, 6];
        break;
      case 'augmentedThird':
        pitches = [0, 4, 8];
        break;
      case 'majorSeventh':
        pitches = [0, 4, 7, 10];
        break;
    }

    const notes = pitches.map(p => new Note(p));
    notes.forEach(n => n.shift(config.octave));
    switch (config.inversion) {
      case 'first':
        notes[1].shift(-1);
        break;
      case 'second':
        notes[1].shift(-1);
        notes[2].shift(-1);
        break;
    }

    this.notes = notes;
  }
}

export class ManualChord extends BaseChord {
  constructor(steps, tonic) {
    super();
    this.notes = steps.map(step => {
      return new Note(tonic + step);
    });
  }
}
