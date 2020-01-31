const assert = require('assert');

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(A, K) {
  let start = 0;
  let end = start;
  let maxCount = 0;
  let count = 0;

  while(end < A.length) {
    if (A[end] === 1) {
      count++;
      maxCount = Math.max(count, maxCount);
    }

    if (maxCount + K < end - start + 1) {
      count-=A[start];
      start++;
    }
  
    end++;
  }

  return A.length - start;
};

assert.deepEqual(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2), 6);
assert.deepEqual(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3), 10);
