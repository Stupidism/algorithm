const assert = require('assert');

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  if (numCourses < 2) return true;
  const [graph, degrees] = createGraph(numCourses, prerequisites);
  const leafs = [];

  for (let index = 0; index < degrees.length; index++) {
    if (degrees[index] < 1) {
      leafs.push(index);
    }
  }

  if (!leafs.length) {
    return !prerequisites.length;
  }

  let restNum = numCourses;

  while(leafs.length) {
    // console.log('leafs', leafs, degrees);
    const len = leafs.length;
    for (let i = 0; i < len; i++) {
      restNum--;
      const p1 = leafs.shift();
      
      for (const p2 of graph[p1]) {
        degrees[p2]--;
        // console.log('p2', p2, degrees);
        if (degrees[p2] === 0) {
          leafs.push(p2);
        }
      }
    }

    if (!leafs.length) {
      break;
    }
  }

  return restNum === 0;
};

function createGraph(n, edges) {
  const degrees = [];
  const graph = [];

  for (let i = 0; i < n; i++) {
    degrees[i] = 0;
    graph[i] = [];
  }

  edges.forEach(([p1, p2]) => {
    degrees[p1]++;
    graph[p2].push(p1);
  });

  return [graph, degrees];
}

assert.deepEqual(canFinish(3, [[2,0], [2, 1]] ), true);
assert.deepEqual(canFinish(3, [[1,0]] ), true);
assert.deepEqual(canFinish(2, [] ), true);
assert.deepEqual(canFinish(2, [[1,0]] ), true);
assert.deepEqual(canFinish(2, [[1,0],[0,1]]), false);
