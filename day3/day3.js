const fs = require('fs');
const real = fs.readFileSync('day3.csv', 'utf-8').split('\n');
const sample = real;

function getHighestPair(list) {
    let leftMax = 0;
    let leftIndex = 0;
    for (let i = 0; i < list.length - 1; i++) {
        const curr = parseInt(list[i])
        if (curr > leftMax) {
            leftMax = curr;
            leftIndex = i;
        }
    }
    let rightMax = 0;
    let rightIdx = list.length - 1;
    for (let i = list.length - 1; i > leftIndex; i--) {
        const curr = parseInt(list[i])
        if (curr > rightMax) {
            rightMax = curr;
            rightIdx = i;
        }
    }
    console.log(leftMax, rightMax)
    return parseInt(`${leftMax}${rightMax}`)
}
let answers = 0;
for (const bank of sample) {
    answers += getHighestPair(bank)
}
console.log(answers);