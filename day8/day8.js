const util = require('../utils');
const real = util.readFile('day8/day8.csv', 'utf8');
const example = util.readFile('day8/day8-example.csv', 'utf8');
const sample = real.split('\n').filter(line => line.trim()); // Use real data for the final answer
const map = {};

// Correct Euclidean distance formula
function distance(a, b) {
  const parseA = a.split(',').map(val => parseInt(val));
  const parseB = b.split(',').map(val => parseInt(val));

  const dx = parseA[0] - parseB[0];
  const dy = parseA[1] - parseB[1];
  const dz = parseA[2] - parseB[2];
  
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Calculate all pairwise distances
for (let i = 0; i < sample.length - 1; i++) {
  for (let j = i + 1; j < sample.length; j++) {
    map[`${sample[i]}-${sample[j]}`] = distance(sample[i], sample[j]);
  }
}

// Sort by distance (shortest first)
const sorted = Object.entries(map).sort((a, b) => a[1] - b[1]);

// Union-Find data structure to track connected components (circuits)
class UnionFind {
  constructor(nodes) {
    this.parent = {};
    this.size = {};
    
    // Initialize each node as its own parent with size 1
    for (const node of nodes) {
      this.parent[node] = node;
      this.size[node] = 1;
    }
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) {
      return false; // Already in same component
    }
    
    // Union by size: attach smaller tree under root of larger tree
    if (this.size[rootX] < this.size[rootY]) {
      this.parent[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else {
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
    
    return true; // Successfully merged
  }
  
  getComponentSizes() {
    const sizes = {};
    for (const node in this.parent) {
      const root = this.find(node);
      if (!sizes[root]) {
        sizes[root] = 0;
      }
      sizes[root]++;
    }
    return Object.values(sizes);
  }
}

// Initialize Union-Find with all junction boxes
const uf = new UnionFind(sample);

// For the example: make exactly 10 connection attempts (for real data: use 1000)
const targetConnections = sample.length; // 20 nodes = example, use 10 connections
let connectionAttempts = 0;
let successfulConnections = 0;
for (let i = 0; i < sorted.length && connectionAttempts < targetConnections; i++) {
  const [a, b] = sorted[i][0].split('-');
  connectionAttempts++;
  if (uf.union(a, b)) {
    successfulConnections++;
  }
}

// Get sizes of all circuits and sort by size (largest first)
const componentSizes = uf.getComponentSizes().sort((a, b) => b - a);

console.log('Total junction boxes:', sample.length);
console.log('Total possible connections:', (sample.length * (sample.length - 1)) / 2);
console.log('Connection attempts:', connectionAttempts);
console.log('Successful connections:', successfulConnections);
console.log('Total circuits:', componentSizes.length);
console.log('Circuit sizes:', componentSizes.slice(0, 10));

// Multiply the sizes of the three largest circuits
if (componentSizes.length >= 3) {
  const ans = componentSizes[0] * componentSizes[1] * componentSizes[2];
  console.log('Answer:', ans);
} else {
  console.log('Not enough circuits to multiply 3 sizes');
  console.log('Available circuits:', componentSizes.length);
}
