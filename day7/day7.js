const util = require('../utils');
const real = util.readFile('/day7/day7.csv');
const example = util.readFile('/day7/day7-example.csv');
const sample = real.split('\n');
const start = sample[0].indexOf('S');
let ans = 0;
const map = {};

function splitRay(x, y) {
  const curr = sample[x][y];
  if (curr === '^') {
    if (!map[`${x}${y}`]) {
      ans++;
      map[`${x}${y}`] = true;
    }
    if (y - 1 >= 0) {
      splitRay(x + 1, y - 1);
    }
    if (y + 1 < sample[0].length) {
      splitRay(x + 1, y + 1);
    }
  } else if (curr === '.' || curr === 'S') {
    if (x + 1 < sample.length) {
      sample[x] = sample[x].substring(0, y) + '|' + sample[x].substring(y + 1);
      splitRay(x + 1, y);
    }
  }
}

splitRay(0, start);
// 1384
console.log(ans);
