/*
 * @lc app=leetcode id=209 lang=javascript
 *
 * [209] Minimum Size Subarray Sum
 */

// @lc code=start
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
const sum = (nums) => nums.reduce((s, num) => s + num, 0);

var minSubArrayLen = function(s, nums) {
  const total = sum(nums);

  if (total < s) return 0;

  let left= 0;
  let right = 1;
  let curSum = nums[0];
  let minLen = nums.length;

  while(left < nums.length && left < right) {
    if (curSum >= s) {
      minLen = Math.min(minLen, right -left);
      curSum -= nums[left];
      left += 1;
    } else if (right < nums.length) {
      curSum += nums[right];
      right += 1;
    } else {
      break;
    }
  }

  return minLen;
};
// @lc code=end

console.log('res', minSubArrayLen(7, [2,3,1,2,4,3]));
