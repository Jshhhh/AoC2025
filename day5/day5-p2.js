const fs = require('fs');
const real = fs.readFileSync(__dirname + '/day5.csv', 'utf-8');
const example = fs.readFileSync(__dirname + '/day5-example.csv', 'utf-8');
const sample = real.split('---------\n');
const ranges = sample[0].split('\n');
let mergedRanges = [];

function getMinMax(pair) {
  return pair.split('-').map(val => parseInt(val));
}

for (const range of ranges) {
  let hasMerged = false;
  if (range) {
    for (let i = 0; i < mergedRanges.length; i++) {
      const [minR, maxR] = getMinMax(mergedRanges[i]);
      const [min, max] = getMinMax(range);
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

let ans = 0;
let index = 0;

mergedRanges = mergedRanges.sort((a, b) => {
  const [mina, maxa] = getMinMax(a);
  const [minb, maxb] = getMinMax(b);
  return mina - minb;
});
console.log(mergedRanges.length);

function mergeRanges() {
  let hasSomethingMerged = false;
  while (index < mergedRanges.length) {
    let hasMerged = false;
    if (mergedRanges[index]) {
      const [min, max] = getMinMax(mergedRanges[index]);
      for (let i = 0; i < mergedRanges.length; i++) {
        if (mergedRanges[i] && i !== index) {
          const [newMin, newMax] = getMinMax(mergedRanges[i]);
          if (min > newMax || max < newMin) continue;
          hasMerged = true;
          hasSomethingMerged = true;
          mergedRanges[i] = undefined;
          mergedRanges[index] =
            `${Math.min(newMin, min)}-${Math.max(newMax, max)}`;
        }
      }
    }
    if (!hasMerged) {
      index++;
    }
    mergedRanges = mergedRanges.filter(val => val);
  }
  if (hasSomethingMerged) {
    mergeRanges();
  }
}

mergeRanges();

for (const range of mergedRanges) {
  const [min, max] = getMinMax(range);
  ans += max - min + 1
}

console.log(ans);
