const util = require('../utils');
const real = util.readFile('day6/day6.csv').split('\n');
let ans = 0;
const grid = [];
let index = 0;
for (let i = 0; i < real[0].length; i++) {
  let num = '';
  let hasNum = false;
  for (let j = 0; j < real.length - 1; j++) {
    const curr = real[j][i];
    if (curr !== ' ') {
      hasNum = true;
      num += curr;
    }
  }
  if (!hasNum) {
    index++;
    continue;
  }
  if (!grid[index]) {
    grid[index] = [];
  }
  const last = real[real.length - 1][i];
  if (last == '*' || last == '+') {
    grid[index].push(last);
  }
  grid[index].unshift(parseInt(num));
  num = '';
}

for (const row of grid) {
  const newRow = row;
  let curr = newRow[0];
  for (let i = 1; i < newRow.length - 1; i++) {
    const action = newRow[newRow.length - 1];
    if (action === '+') {
      curr += newRow[i];
    } else {
      curr *= newRow[i];
    }
  }
  console.log(curr);
  ans += curr;
}
console.log(ans);
