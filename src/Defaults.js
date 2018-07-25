
const tonics = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const keys = [];
for (var i = 0; i < 36; i++){
  const value = i - 12;
  const name = tonics[i % 12] + (1 + Math.floor(i/12));
  keys.push({
    label: name,
    value: value,
  });
}
const domDurations = `
// vampire
// duration 0.77

3
1
3
1
3
1
4

// 2018/06/08

// 1
// 1
// 1
// 3
// 1
// 1
// 1
// 3
`;
const domChords = `
// chords for https://www.youtube.com/watch?v=lLD0Z_PRyQc&t=1m
// key B1

 0, 4, 7
-1, 4, 8
 0, 5, 9
 0, 4, 7
-1, 2, 7
 0, 4, 7
 0, 5, 9

// 2018/06/08

// 1, 5, 8, 17
// 1, 5, 8, 20
// 1, 5, 8, 17
// 1, 7, 10, 15
// 1, 6, 9, 15
// 1, 6, 9, 13
// 1, 6, 9, 15
// 1, 5, 8, 17

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

export default {
  keys: keys,
  durations: domDurations,
  chords: domChords,
};
