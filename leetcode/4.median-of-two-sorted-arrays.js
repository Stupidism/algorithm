 const assert = require('assert');

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

const findMedian = (nums1, nums2, start = 0, end = nums1.length) => {
  const breakpoint1 = start + ((end - start) >> 1);
  const breakpoint2 = ((nums1.length + nums2.length) >> 1) - breakpoint1;

  const left1 = breakpoint1 === 0 ? -Infinity : nums1[breakpoint1 - 1];
  const right1 = breakpoint1 === nums1.length ? Infinity : nums1[breakpoint1];
  const left2 = breakpoint2 === 0 ? -Infinity : nums2[breakpoint2 - 1];
  const right2 = breakpoint2 === nums2.length ? Infinity : nums2[breakpoint2];

  if (left2 > right1) {
    return findMedian(nums1, nums2, breakpoint1 + 1, end);
  }

  if (left1 > right2) {
    return findMedian(nums1, nums2, start, breakpoint1 - 1);
  } 

  const right = Math.min(right1, right2);

  if ((nums1.length + nums2.length) % 2 === 1) return right;

  const left = Math.max(left1, left2);

  return (left + right) / 2;
};

var findMedianSortedArrays = function(nums1, nums2) {  
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  if (!nums1.length) return getMedian(nums2);

  if (nums1.length === 1 && nums2.length ===1) {
    return (nums1[0] + nums2[0]) / 2;
  }

  return findMedian(nums1, nums2);
};

function getMedian(nums) {
  const left = Math.floor((nums.length - 1) / 2);
  const right = Math.floor((nums.length) / 2);

  return (nums[left] + nums[right]) / 2;
};


assert.deepEqual(findMedianSortedArrays([1, 3], [2]), 2);
assert.deepEqual(findMedianSortedArrays([1], [2, 3, 4]), 2.5);
assert.deepEqual(findMedianSortedArrays([2], [1]), 1.5);
assert.deepEqual(findMedianSortedArrays([1], [2]), 1.5);
assert.deepEqual(findMedianSortedArrays([], [1, 2]), 1.5);
assert.deepEqual(findMedianSortedArrays([3], [1, 2]), 2);
assert.deepEqual(findMedianSortedArrays([2, 3], [0, 4]), 2.5);
assert.deepEqual(findMedianSortedArrays([1, 3, 5, 7, 9, 10, 11], [1, 2, 3, 5, 6]), 5);
assert.deepEqual(findMedianSortedArrays([1, 2], [3, 4]), 2.5);

