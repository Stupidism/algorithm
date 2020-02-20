const assert = require('assert');

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
  const degrees = [];
  const children = [];

  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
    children[i] = [];
  }

  edges.forEach(([p1, p2]) => {
    degrees[p1]++;
    degrees[p2]++;
    children[p1].push(p2);
    children[p2].push(p1);
  });

  const leafs = [];

  for (let index = 0; index < degrees.length; index++) {
    if (degrees[index] === 1) {
      leafs.push(index);
    }
  }

  if (!leafs.length) {
    return [0];
  }

  while(1) {
    
    const len = leafs.length;
    for (let i = 0; i < len; i++) {
      const p1 = leafs[i];

      for (const p2 of children[p1]) {
        degrees[p2]--;
        if (degrees[p2] === 1) {
          leafs.push(p2);
        }
      }
    }

    if (leafs.length > len) {
      leafs.splice(0, len);
      continue;
    }

    return leafs;
  }
};

assert.deepEqual(findMinHeightTrees(1, []), [0]);
assert.deepEqual(findMinHeightTrees(6, [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]), [3, 4]);
assert.deepEqual(findMinHeightTrees(2, [[0, 1]]), [0, 1]);
assert.deepEqual(findMinHeightTrees(4, [[1, 0], [1, 2], [1, 3]]), [1]);
