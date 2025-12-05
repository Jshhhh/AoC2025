const fs = require('fs');
const real = fs.readFileSync('day5.csv', 'utf-8');
const example = fs.readFileSync('day5-example.csv', 'utf-8');
const sample = real.split('---------\n');
const ranges = sample[0].split('\n');
const values = sample[1].split('\n');
const mergedRanges = [];

function mergeRanges(r) {
  for (const range of ranges) {
    let hasMerged = false;
    if (range) {
      for (let i = 0; i < mergedRanges.length; i++) {
        const [minR, maxR] = mergedRanges[i]
          .split('-')
          .map(val => parseInt(val));
        const [min, max] = range.split('-').map(val => parseInt(val));
        if (min > maxR || max < minR) continue;
        // if (min <= minR && max > minR && max <= maxR) {
        hasMerged = true;
        mergedRanges[i] = `${Math.min(minR, min)}-${Math.max(maxR, max)}`;
        // } else if ()
      }
      if (!hasMerged) {
        mergedRanges.push(range);
      }
    }
  }
}

let ans = 0;
console.log(mergedRanges);
for (const val of values) {
  for (const range of mergedRanges) {
    const [min, max] = range.split('-').map(val => parseInt(val));
    const value = parseInt(val);
    if (min <= value && value <= max) {
      ans++;
      break;
    }
  }
}

console.log(ans);
