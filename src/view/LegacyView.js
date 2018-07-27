import {
  Phrase,
} from '../audio/Phrase';
let currPhrase = null;

const loadPhrase = function(){
  const domKey = document.getElementById("key");
  const domSpeed = document.getElementById("speed");
  const domDurations = document.getElementById("durations");
  const domChords = document.getElementById("chords");

  if (currPhrase){
    currPhrase.stop();
  }

  const tonic = parseFloat(domKey.value);
  const speed = parseFloat(domSpeed.value);
  const phraseSteps = domChords.value
    .split('\n')
    .map(ps => ps.trim())
    .filter(ps => ps !== '' && !ps.startsWith('//'))
    .map(ps => ps.split(',').map(cs => parseFloat(cs)));
  const durations = domDurations.value
    .split('\n')
    .map(d => d.trim())
    .filter(d => d !== '' && !d.startsWith('//'))
    .map(d => parseFloat(d) * speed);

  currPhrase = new Phrase(tonic, phraseSteps, durations);
}
const playPhrase = function(){
  currPhrase.play();
}
const stopPhrase = function(){
  currPhrase.stop();
}
const loadAndPlay = function(){
  loadPhrase();
  playPhrase();
}

export {
  playPhrase,
  stopPhrase,
  loadPhrase,
  loadAndPlay,
}
