const assert = require('assert');

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  const visiting = new Set();
  const visited = new Set();
  const graph = [];
  graph.length = numCourses;

  for (const [course, depen] of prerequisites) {
    graph[course] = graph[course] || [];
    graph[course].push(depen);
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) {
      return [];
    }
  }

  return [...visited];

  function hasCycle(course) {
    visiting.add(course);

    for (const depen of (graph[course] || [])) {
      if (visiting.has(depen)) return true;
      if (visited.has(depen)) continue;

      if (hasCycle(depen)) {
        return true;
      }
    }

    visiting.delete(course);
    visited.add(course);

    return false;
  }
};

assert.deepEqual(findOrder(1, [] ), [0]);
assert.deepEqual(findOrder(2, [[1,0]] ), [0, 1]);
assert.deepEqual(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]), [0,1,2,3]);
