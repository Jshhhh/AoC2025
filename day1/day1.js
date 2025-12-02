const fs = require('fs');
const input = fs.readFileSync('day1.csv', 'utf-8').split('\n');
// const input = fs.readFileSync('day1-example.csv', 'utf-8').split('\n');
let ans = 0;
let current = 50;

function checkNumb(numb) {
    if (numb < 0) {
        numb += 100
    } else if (numb > 99) {
        numb -= 100
    } else {
        if (numb === 0) ans++
        return numb
    }
    return checkNumb(numb)
}

function moveLeft(num) {
    current -= num;
}

function moveRight(num) {
    current += num;
}

function checkAnswer(num) {
    if (num === 0) ans++;
}

for (let i = 0; i < input.length; i++) {
    const instruction = input[i];
    const substring = parseInt(instruction.substring(1, instruction.length));
    if (instruction[0] == 'L') {
        moveLeft(substring);
    } else if (instruction[0] == 'R') {
        moveRight(substring);
    }
    current = checkNumb(current);
}

console.log('Answer: ', ans);