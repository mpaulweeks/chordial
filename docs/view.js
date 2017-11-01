
const domPlay = document.getElementById("play");
const domStop = document.getElementById("stop");
const domLoad = document.getElementById("load");
const domLoadPlay = document.getElementById("load-play");
const domKey = document.getElementById("key");
const domSpeed = document.getElementById("speed");
const domDurations = document.getElementById("durations");
const domChords = document.getElementById("chords");
let currPhrase = null;

const loadPhrase = function(){
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

// generate HTML
const tonics = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
for (var i = 0; i < 36; i++){
  const value = i - 12;
  const name = tonics[i % 12] + (1 + Math.floor(i/12));
  domKey.innerHTML += `<option value="${value}">${name}</option>`;
}

// event listeners
domPlay.addEventListener('click', playPhrase);
domStop.addEventListener('click', stopPhrase);
domLoad.addEventListener('click', loadPhrase);
domLoadPlay.addEventListener('click', () => {
  loadPhrase();
  playPhrase();
});

// defaults
domKey.value = -10;
domSpeed.value = `0.77`;
domDurations.value = `
// durations

3
1
3
1
3
1
4

`;
domChords.value = `
// chords for https://www.youtube.com/watch?v=lLD0Z_PRyQc&t=1m

 0, 4, 7
-1, 4, 8
 0, 5, 9
 0, 4, 7
-1, 2, 7
 0, 4, 7
 0, 5, 9

// reference

// I
// 0,4,7

// IV 64
// 0,5,9

// V 6
// 2,7,11

// V7
// -5,-1,2,5
`;

// app start
loadPhrase();
