const fs = require("fs");
const real = fs.readFileSync("day3.csv", "utf-8").split("\n");
const example = fs.readFileSync("day3-example.csv", "utf-8").split("\n");
const sample = real;

function createMap(list) {
  const map = {};
  for (let i = 0; i < list.length; i++) {
    if (!map[list[i]]) {
      map[list[i]] = 1;
    } else {
      map[list[i]]++;
    }
  }
  return map;
}

function getHighest(list) {
    const max = Math.max(...list);
    const index = list.indexOf(max);
  return [max, index];
}

function getFirstHighest(list) {
  const values = list.split("").map((val) => parseInt(val));
  let leftIndex = 0;
  let ans = [];

  for (let i = 0; i < 12; i++) {
    const [max, idx] = getHighest(
      values.slice(leftIndex, values.length + ans.length - 11)
    );
    ans.push(`${max}`);
    leftIndex = idx + leftIndex + 1;
  }
  return parseInt(ans.join(""));
}
let answers = 0;
for (const bank of sample) {
  answers += getFirstHighest(bank);
}
// 173066159450632
console.log("Answer: ", answers);
