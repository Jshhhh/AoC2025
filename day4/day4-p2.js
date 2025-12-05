const fs = require("fs");
const real = fs.readFileSync("day4.csv", "utf8");
const example = fs.readFileSync("day4-example.csv", "utf8");
let sample = real.split("\n").map(row => row.split('')); // Use example for testing
let ans = 0;
let coordinates = [];

function checkSurroundings(x, y) {
  let rolls = 0;
  if (sample[x][y] === "@") {
    if (sample[x - 1]) {
      for (let i = -1; i < 2; i++) {
        if (sample[x - 1][y + i] === '@') {
          rolls += 1;
        }
      }
    }
    if (sample[x]) {
      if (sample[x][y - 1] === '@') {
        rolls += 1;
      }
      if (sample[x][y + 1] === '@') {
        rolls += 1;
      }
    }
    if (sample[x + 1]) {
      for (let i = -1; i < 2; i++) {
        if (sample[x + 1][y + i] === '@') {
          rolls += 1;
        }
      }
    }
    if (rolls < 4) {
      ans++;
      coordinates.push(`${x}-${y}`)
    }
  }
}

function checkGrid() {
    for (let i = 0; i < sample.length; i++) {
        for (let j = 0; j < sample[i].length; j++) {
            checkSurroundings(i, j);
        }
    }
    coordinates.forEach(str => {
        const [x, y] = str.split('-');
        sample[x][y] = '.'
    });
    coordinates = [];
}
let hasChange = true;
while(hasChange) {
    const currAns = ans;
    checkGrid();
    hasChange = currAns !== ans
}

// console.log(checkSurroundings(137, 133))
console.log("Answer: ", ans);