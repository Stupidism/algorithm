const assert = require('assert');

class PriorityQueue extends Array {
  constructor(priorityComparer) {
    super();
    this.values = [];
    this.priorityComparer = priorityComparer;
  }

  offer(val) {
    let index = this.values.length;
    let parent = this.getParent(index);
    this.values.push(val);
    while(index > 0 && this.isPriorityHigher(this.values[index], this.values[parent])) {
      this.swap(index, parent);
      index = parent;
      parent = this.getParent(index);
    }
  }

  poll() {
    this.swap(0, this.values.length - 1);
    const res = this.values.pop();
    let index = 0;
    let higherPriorityChild = this.getHigherPriorityChild(index);
    while(!this.isLeaf(index) && this.isPriorityHigher(this.values[higherPriorityChild], this.values[index])) {
      this.swap(index, higherPriorityChild);
      index = higherPriorityChild;
      higherPriorityChild = this.getHigherPriorityChild(index);
    }
    return res;
  }

  swap(a, b) {
    const d = this.values[a];
    this.values[a] = this.values[b];
    this.values[b] = d;
  }

  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  getHigherPriorityChild(index) {
    const left = 2 * index + 1;
    const right = left + 1;
    if (right >= this.values.length) {
      return left;
    }
    return this.isPriorityHigher(this.values[left], this.values[right]) ? left : right;
  }

  isPriorityHigher(a, b) {
    return this.priorityComparer(a, b) < 0;
  }

  isLeaf(index) {
    return 2 * index + 1 >= this.values.length;
  }

  size() {
    return this.values.length;
  }
}

/**
* @param {number[][]} heightMap
* @return {number}
*/

class Node {
  constructor(x, y, height) {
    this.x = x;
    this.y = y;
    this.height = height;
  }
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const priorityComparer = (a, b) => a.height - b.height;

var trapRainWater = function(heightMap) {
  if (heightMap.length < 3 || heightMap[0].length < 3) {
    return 0;
  }
  const m = heightMap.length - 1;
  const n = heightMap[0].length - 1;
  
  const visited = [];
  const boundaries = new PriorityQueue(priorityComparer);

  for (let i = 0; i <= m; i++) {
    visited[i] = [];
    visited[i][0] = visited[i][n] = true;
    boundaries.offer(new Node(i, 0, heightMap[i][0]));
    boundaries.offer(new Node(i, n, heightMap[i][n]));
  }

  for (let j = 1; j < n; j++) {
    visited[0][j] = visited[m][j] = true;
    boundaries.offer(new Node(0, j, heightMap[0][j]));
    boundaries.offer(new Node(m, j, heightMap[m][j]));
  }

  let rain = 0;
  while(boundaries.size()) {
    const b = boundaries.poll();
    // console.log('b', b, visited);

    for (const [deltaX, deltaY] of directions) {
      const newX = b.x + deltaX;
      const newY = b.y + deltaY;
      if (newX > 0 && newX < m && newY > 0 && newY < n && !visited[newX][newY]) {
        const newHeight = heightMap[newX][newY];
        boundaries.offer(new Node(newX, newY, Math.max(newHeight, b.height)));
        visited[newX][newY] = true;
        rain += Math.max(0, b.height - newHeight);
        // console.log('newHeight', newHeight, b.height);
      }
    }
  }

  return rain;
};

assert.deepEqual(trapRainWater([
  [1,4,3,1,3,2],
  [3,2,1,3,2,4],
  [2,3,3,2,3,1]
]), 4);
