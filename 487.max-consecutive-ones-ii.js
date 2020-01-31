const assert = require('assert');

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var findMaxConsecutiveOnes = function(A) {
  let start = 0;
  let end = start;
  let maxCount = 0;
  let count = 0;

  while(end < A.length) {
    if (A[end] === 1) {
      count++;
      maxCount = Math.max(count, maxCount);
    }

    if (maxCount < end - start) {
      count-=A[start];
      start++;
    }
  
    end++;
  }

  return A.length - start;
};

assert.deepEqual(findMaxConsecutiveOnes([1,0,1,1,0]), 4);
