const assert = require('assert');

const sort = (originalNums) => {
  const nums = [...originalNums];

  quickSort(0, nums.length - 1);

  return nums;

  function swap(i, j) {
    const num = nums[i];
    nums[i] = nums[j];
    nums[j] = num;
  }

  function quickSort(left, right) {
    if (left >= right) {
      return;
    }

    let i = left;
    let j = right;

    while (i < j) {
      while(i < j && nums[j] > nums[left]) {
        j -= 1;
      }

      while(i < j && nums[i] <= nums[left]) {
        i += 1;
      }

      swap(i, j);
    }

    swap(left, i);
    quickSort(left, i - 1);
    quickSort(i + 1, right);
  }
}


const findMedian = (nums) => {
  if (!nums.length) return null;

  const sortedNums = sort(nums);
  const left = Math.floor((sortedNums.length - 1) / 2);
  const right = Math.floor((sortedNums.length) / 2);

  console.log('sortedNums', sortedNums, left, right, (nums[left] + nums[right]) / 2);


  return (sortedNums[left] + sortedNums[right]) / 2;
}


assert(findMedian([]) === null);
assert(findMedian([1,2,3]) === 2);
assert(findMedian([1,2,3,4]) === 2.5);
assert(findMedian([3,4,2,1,5]) === 3);
