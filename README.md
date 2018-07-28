# chordial
simple web page to try out chords

## original idea

- Pick key
- Represent chords by harmonic function and/or custom
- Drag chords into qwerty keys bay
- Press key to play chord

## todo

- better sounding oscillator, look into midi
- store songs in json
  - select for loading song configs
- display keyboard
  - keyboard should have numbers on keys
    - match current tonic
  - keyboard lights up when playing
- hunt down and refactor this:
```
this.instrumentInfo = function (n) {
  var key = this.instrumentKeys()[n];
  var p = 1 * key.substr(0, 3);
  return {
    variable: '_tone_' + key,
    url: 'https://surikov.github.io/webaudiofontdata/sound/' + key + '.js',
    title: this.instrumentTitles()[p]
  };
};
```