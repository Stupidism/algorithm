const assert = require('assert');

/**
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function(A) {
  let maxStart = 0;
  let maxScore = 0;
  for (let i = 0; i < A.length; i++) {
    const start = A[i] + i;
    const end = A[i] - i;
    maxScore = Math.max(maxStart + end, maxScore);
    maxStart = Math.max(start, maxStart);
  }
  return maxScore;
};

assert.deepEqual(maxScoreSightseeingPair([8,1,5,2,6]), 11)
