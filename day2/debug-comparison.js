const fs = require("fs");
const real = fs.readFileSync("day2.csv", "utf-8").split(",");

// Your original functions
function checkSingle(numStr) {
  let start = numStr[0];
  if (numStr.length < 2) return false;
  
  for (let i = 1; i < numStr.length; i++) {
    if (numStr[i] !== start) {
      return false;
    }
  }
  return true;
}

function checkDouble(numStr) {
  let start = numStr.slice(0, 2);
  if (numStr.length % 2 !== 0 || numStr.length < 3) {
    return false;
  }
  for (let i = 2; i <= numStr.length - 2; i += 2) {
    if (start !== numStr.slice(i, i + 2)) {
      return false;
    }
  }
  return true;
}

function checkTriple(numStr) {
  let start = numStr.slice(0, 3);
  if (numStr.length % 3 !== 0 || numStr.length < 5) {
    return false;
  }
  for (let i = 3; i <= numStr.length - 3; i += 3) {
    if (start !== numStr.slice(i, i + 3)) {
      return false;
    }
  }
  return true;
}

function checkQuad(numStr) {
  let start = numStr.slice(0, 4);
  if (numStr.length % 4 !== 0 || numStr.length < 7) {
    return false;
  }
  for (let i = 4; i <= numStr.length - 4; i += 4) {
    if (start !== numStr.slice(i, i + 4)) {
      return false;
    }
  }
  return true;
}

function checkQuin(numStr) {
  let start = numStr.slice(0, 5);
  if (numStr.length % 5 !== 0 || numStr.length < 9) {
    return false;
  }
  for (let i = 5; i <= numStr.length - 5; i += 5) {
    if (start !== numStr.slice(i, i + 5)) {
      return false;
    }
  }
  return true;
}

function originalCheck(numStr) {
  return checkSingle(numStr) || checkDouble(numStr) || checkTriple(numStr) || checkQuad(numStr) || checkQuin(numStr);
}

// Corrected function
function isRepeatingPattern(numStr) {
  for (let patternLength = 1; patternLength <= Math.floor(numStr.length / 2); patternLength++) {
    if (numStr.length % patternLength === 0) {
      const pattern = numStr.slice(0, patternLength);
      const repetitions = numStr.length / patternLength;
      
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

let originalSum = 0;
let correctedSum = 0;
let differences = [];

function checkRange(min, max) {
  for (let i = parseInt(min); i <= parseInt(max); i++) {
    const numStr = i.toString();
    const originalResult = originalCheck(numStr);
    const correctedResult = isRepeatingPattern(numStr);
    
    if (originalResult) originalSum += i;
    if (correctedResult) correctedSum += i;
    
    if (originalResult !== correctedResult) {
      differences.push({
        number: i,
        original: originalResult,
        corrected: correctedResult,
        difference: originalResult ? i : -i
      });
    }
  }
}

for (let i = 0; i < real.length; i++) {
  const [min, max] = real[i].split("-");
  checkRange(min, max);
}

console.log("Original sum:", originalSum);
console.log("Corrected sum:", correctedSum);
console.log("Difference:", originalSum - correctedSum);
console.log("\nNumbers that differ:");
differences.forEach(diff => {
  console.log(`${diff.number}: original=${diff.original}, corrected=${diff.corrected}, impact=${diff.difference}`);
});
