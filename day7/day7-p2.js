const util = require('../utils');
const real = util.readFile('/day7/day7.csv');
const example = util.readFile('/day7/day7-example.csv');
const sample = real.split('\n').filter(line => line.length > 0); // Final answer with real data
const start = sample[0].indexOf('S');
console.log(`Grid has ${sample.length} rows, S at column ${start}`);

// For quantum mechanics: count ALL possible timelines/paths
function countTimelines(x, y, memo = {}) {
  const memoKey = `${x},${y}`;
  if (memo[memoKey] !== undefined) {
    return memo[memoKey];
  }
  
  // Check if particle exited through the bottom - SUCCESS
  if (x >= sample.length) {
    return memo[memoKey] = 1;
  }
  
  // Check bounds - particle exits through sides, FAIL  
  if (x < 0 || y < 0 || y >= sample[x].length) {
    return memo[memoKey] = 0;
  }
  
  const curr = sample[x][y];
  let totalTimelines = 0;
  
  if (curr === '^') {
    // Quantum splitter: particle takes BOTH paths
    // Left timeline
    if (y - 1 >= 0) {
      totalTimelines += countTimelines(x + 1, y - 1, memo);
    }
    // Right timeline  
    if (y + 1 < sample[x].length) {
      totalTimelines += countTimelines(x + 1, y + 1, memo);
    }
  } else if (curr === '.' || curr === 'S') {
    // Empty space or start - continue downward
    totalTimelines = countTimelines(x + 1, y, memo);
  } else if (curr === '|') {
    // Continue downward
    totalTimelines = countTimelines(x + 1, y, memo);
  }
  
  return memo[memoKey] = totalTimelines;
}

const totalTimelines = countTimelines(0, start);
console.log('Total timelines:', totalTimelines);
