const fs = require("fs");
const sample = fs.readFileSync("day2.csv", "utf-8").split(",");
let answers = 0;

function checkPattern(num) {
  const numStr = num.toString();
  if (numStr.length % 2 === 1) {
    return;
  }
  if (numStr.slice(0, numStr.length / 2) === numStr.slice(numStr.length / 2)) {
    answers += num;
  }

//   for (let i = 0; i < numStr.length / 2 - 1; i++) {
//     for (let j = numStr.length / 2; j < numStr.length; j++) {
//       isSame = numStr[i] === numStr[j];
//     }
//   }
//   if (isSame) {
//     answers += num;
//   }
}

function iterateRange(min, max) {
  for (let i = parseInt(min); i <= parseInt(max); i++) {
    checkPattern(i);
  }
}

for (let i = 0; i < sample.length; i++) {
  const [min, max] = sample[i].split("-");
  iterateRange(min, max);
}
console.log(answers);