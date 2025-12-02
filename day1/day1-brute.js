const fs = require("fs");
const real = fs.readFileSync(__dirname + "/day1.csv", "utf-8").split("\n");
const example = fs
  .readFileSync(__dirname + "/day1-example.csv", "utf-8")
  .split("\n");
let ans = 0;
let current = 50;
const input = real;

function moveLeft(num) {
    for (let j = 0; j < num; j++) {
        current--;
        if (current === -1) {
            current = 99;
        }
        if (current === 0) ans++;
    }
}

function moveRight(num) {
  for (let k = 0; k < num; k++) {
        current++;
        if (current === 100) {
            current = 0;
        }
        if (current === 0) ans++;
    }
}

for (let i = 0; i < input.length; i++) {
  const instruction = input[i];
  const substring = parseInt(instruction.substring(1, instruction.length));
  if (instruction[0] == "L") {
    moveLeft(substring);
  } else if (instruction[0] == "R") {
    moveRight(substring);
  }
}

console.log("Answer: ", ans);
