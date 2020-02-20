const assert = require('assert');

/**
 * @param {string} s
 * @return {number}
 */
var subarraysWithKDistinct = function(A, K) {
  let res = 0;
  let start1 = 0;
  let start2 = 0;
  const count1 = new Map();
  const count2 = new Map();

  let end;
  for (end = 0; end < A.length; end++) {
    const num = A[end];

    add(count1, num);
    add(count2, num);

    while (count1.size > K) {
      remove(count1, A[start1]);
      start1++;
    }
    while (count2.size >= K) {
      remove(count2, A[start2]);
      start2++;
    }

    res += (start2 - start1);
  }

  return res;

  function add(map, num) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  function remove(map, num) {
    if (map.get(num) === 1) {
      map.delete(num);
    } else {
      map.set(num, map.get(num) - 1);
    }
  }
};

assert.deepEqual(subarraysWithKDistinct([1,2,1,2,3], 2), 7);
assert.deepEqual(subarraysWithKDistinct([1,2,1,3,4], 3), 3);
