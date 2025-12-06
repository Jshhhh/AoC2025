const util = require('../utils');
const real = util.readFile('day6/day6.csv').split('\n');
let ans = 0;
const grid = [];

for (let i = 0; i < real.length; i++) {
  let num = '';
  let index = 0;
  for (let j = 0; j < real[i].length; j++) {
    const curr = real[i][j];
    if (curr !== ' ') {
      num += curr;
    } else {
      if (!num) continue;
      if (!grid[index]) {
        grid[index] = [];
      }
      grid[index][i] = num === '+' || num === '*' ? num : parseInt(num);
      num = '';
      index++;
    }
  }
  if (num.length) {
    if (!grid[index]) {
      grid[index] = [];
    }
    grid[index][i] = parseInt(num);
  }
}

for (const row of grid) {
    let curr = row[0];
    for (let i = 1; i < row.length - 1; i++) {
        const action = row[row.length - 1];
        if (action === '+') {
            curr += row[i];
        } else {
            curr *= row[i];
        }
    }
    ans += curr;
}
console.log(ans);
