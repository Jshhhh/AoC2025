const fs = require("fs");
const real = fs.readFileSync("day2.csv", "utf-8").split(",");
const example = fs.readFileSync("day2-example.csv", "utf-8").split(",");
const sample = real;
let answers = 0;

function isRepeatingPattern(numStr) {
  // Check all possible pattern lengths from 1 to length/2
  // Pattern must be repeated at least twice
  for (let patternLength = 1; patternLength <= Math.floor(numStr.length / 2); patternLength++) {
    if (numStr.length % patternLength === 0) {
      const pattern = numStr.slice(0, patternLength);
      const repetitions = numStr.length / patternLength;
      
      // Must be repeated at least twice
      if (repetitions >= 2) {
        let isValid = true;
        for (let i = 1; i < repetitions; i++) {
          const segment = numStr.slice(i * patternLength, (i + 1) * patternLength);
          if (segment !== pattern) {
            isValid = false;
            break;
          }
        }
        if (isValid) {
          return true;
        }
      }
    }
  }
  return false;
}

function iterateRange(min, max) {
  for (let i = parseInt(min); i <= parseInt(max); i++) {
    const numStr = i.toString();
    if (isRepeatingPattern(numStr)) {
      answers += parseInt(numStr);
    }
  }
}

for (let i = 0; i < sample.length; i++) {
  const [min, max] = sample[i].split("-");
  iterateRange(min, max);
}
console.log(answers);
// 73694270688
