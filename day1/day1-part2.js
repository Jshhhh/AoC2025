const fs = require("fs");
const real = fs.readFileSync(__dirname + "/day1.csv", "utf-8").split("\n");
const example = fs
  .readFileSync(__dirname + "/day1-example.csv", "utf-8")
  .split("\n");
let ans = 0;
let current = 50;
const input = real;

function checkNumb(numb) {
  if (numb < 0) {
    numb += 100;
  } else if (numb > 99) {
    numb -= 100;
  } else {
    if (numb === 0) ans++;
    return numb;
  }
  return checkNumb(numb);
}

function moveLeft(num) {
  current -= num;
}

function moveRight(num) {
  current += num;
}

for (let i = 0; i < input.length; i++) {
  const instruction = input[i];
  const substring = parseInt(instruction.substring(1, instruction.length));
  if (instruction[0] == "L") {
    if (substring >= current && current > 0) {
      const passes = Math.floor(substring / 100);
      const remainder = substring % 100;

      if (remainder >= current) {
        ans += passes + 1;
      } else {
        ans += passes;
      }
    }
    moveLeft(substring);
  } else if (instruction[0] == "R") {
    if (substring >= (100 - current)) {
      const passes = Math.floor(substring / 100);
      const remainder = substring % 100;
      if (remainder >= (100 - current)) {
        ans += passes + 1;
      } else {
        ans += passes;
      }
    }
    moveRight(substring);
  }
  current = checkNumb(current);
}

console.log("Answer: ", ans);
