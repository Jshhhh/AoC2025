const fs = require('fs');
const real = fs.readFileSync('day4.csv', 'utf8');
const example = fs.readFileSync('day4-example.csv', 'utf8');

function solve(input) {
    const grid = input.trim().split('\n');
    let accessible = 0;
    
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            // Only check positions that have a roll (@)
            if (grid[row][col] === '@') {
                let adjacentRolls = 0;
                
                // Check all 8 adjacent positions
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        // Skip the center position (0, 0)
                        if (dr === 0 && dc === 0) continue;
                        
                        const newRow = row + dr;
                        const newCol = col + dc;
                        
                        // Check bounds and if there's a roll
                        if (newRow >= 0 && newRow < grid.length && 
                            newCol >= 0 && newCol < grid[newRow].length &&
                            grid[newRow][newCol] === '@') {
                            adjacentRolls++;
                        }
                    }
                }
                
                // A roll is accessible if it has fewer than 4 adjacent rolls
                if (adjacentRolls < 4) {
                    accessible++;
                }
            }
        }
    }
    
    return accessible;
}

// Test with example (should be 13)
console.log('Example result:', solve(example));

// Run with real data
console.log('Real result:', solve(real));
