// @flow

import Note from './Note';

type ChordConfig = {
  tonic: number,
  octave: number,
  type: string, // major third, minor third, major seventh
  inversion: string, // none, first, second
};

class BaseChord {
  notes: Array<Note>;
  constructor(){
    this.notes = [];
  }
  play(when: number) {
    this.notes.forEach(note => {
      note.play(when);
    });
  }
  stop(when: number) {
    this.notes.forEach(note => {
      note.stop(when);
    });
  }
}

export class PresetChord extends BaseChord {
  constructor(config: any){
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
    notes.forEach(n => n.shiftOctave(config.octave));
    switch (config.inversion) {
      case 'first':
        notes[1].shiftOctave(-1);
        break;
      case 'second':
        notes[1].shiftOctave(-1);
        notes[2].shiftOctave(-1);
        break;
    }

    this.notes = notes;
  }
}

export class ManualChord extends BaseChord {
  constructor(steps: Array<number>, tonic: number) {
    super();
    this.notes = steps.map((step: number) => {
      return new Note(tonic + step);
    });
  }
}
