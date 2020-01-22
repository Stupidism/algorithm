const assert = require('assert');

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  let count = 0;
  let curMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const left = nums[i - 1];
    const num = nums[i];
    // console.log('curMax', curMax, num)

    if (num < curMax) {
      count ++;
      if (count > 1) return false;

      if (i > 1 && nums[i - 2] > num) {
        curMax = left;
      } else {
        curMax = num;
      }
    } else {
      curMax = num;
    }
  }

  return true;
};

assert.deepEqual(checkPossibility([1,3,2,5,4]), false);
assert.deepEqual(checkPossibility([1,5,4,6,7,10,8,9]), false);
assert.deepEqual(checkPossibility([3, 4, 2, 3]), false);
assert.deepEqual(checkPossibility([4,2,3]), true);
assert.deepEqual(checkPossibility([4,2,1]), false);
