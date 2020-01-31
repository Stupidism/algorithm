const assert = require('assert');

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var findMaxConsecutiveOnes = function(A) {
  let end = 0;
  let maxCount = 0;
  let count = 0;

  while(end < A.length) {
    if (A[end] === 1) {
      count++;
      maxCount = Math.max(count, maxCount);
    } else {
      count = 0;
    }
  
    end++;
  }

  return maxCount;
};

assert.deepEqual(findMaxConsecutiveOnes([1,1,0,1,1,1]), 3);
