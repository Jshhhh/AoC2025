const util = require('../utils');
const real = util.readFile('/day7/day7.csv');
const example = util.readFile('/day7/day7-example.csv');

function simulateBeams(grid) {
    const lines = grid.split('\n');
    const startCol = lines[0].indexOf('S');
    const activatedSplitters = new Set();
    const beams = [{ row: 0, col: startCol }]; // Queue of beams to process
    
    while (beams.length > 0) {
        const beam = beams.shift();
        let { row, col } = beam;
        
        // Move this beam downward until it hits a splitter or exits
        while (row < lines.length) {
            const cell = lines[row][col];
            
            if (cell === '^') {
                // Hit a splitter
                const splitterKey = `${row},${col}`;
                
                if (!activatedSplitters.has(splitterKey)) {
                    // First time this splitter is activated
                    activatedSplitters.add(splitterKey);
                    
                    // Create two new beams from immediate left and right of the splitter
                    // These new beams start at the splitter's position and will move down from there
                    if (col - 1 >= 0) {
                        beams.push({ row: row, col: col - 1 });
                    }
                    if (col + 1 < lines[0].length) {
                        beams.push({ row: row, col: col + 1 });
                    }
                }
                
                // Original beam stops here (doesn't continue past the splitter)
                break;
            }
            
            // Move to next row (beam continues downward)
            row++;
        }
    }
    
    return activatedSplitters.size;
}

// Test with example first
console.log('Testing with example:');
const exampleResult = simulateBeams(example);
console.log('Example result:', exampleResult, '(expected: 21)');

// Run on actual input
console.log('\nRunning on actual input:');
const realResult = simulateBeams(real);
console.log('Real result:', realResult);
