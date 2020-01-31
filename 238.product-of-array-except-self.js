const assert = require('assert');
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const res = Array(nums.length).fill(1);

  const max = nums.length - 1;

  let leftProduct = 1;
  let rightProduct = 1;
  for (let i = 0; i <= max; i++) {
    res[i] *= leftProduct;
    leftProduct *= nums[i];
    

    res[max - i] *= rightProduct;
    rightProduct *= nums[max - i];
  }

  return res;
};

assert.deepEqual(productExceptSelf([1,2,3,4]), [24,12,8,6]);
