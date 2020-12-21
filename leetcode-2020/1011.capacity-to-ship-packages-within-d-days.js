/*
 * @lc app=leetcode id=1011 lang=javascript
 *
 * [1011] Capacity To Ship Packages Within D Days
 */

// @lc code=start
/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
const sum = (nums) => nums.reduce((s, num) => s + num, 0);

var shipWithinDays = function(weights, D) {
  const total = sum(weights);
  if (D === 1) return total;  
  const maxWeight = Math.max(...weights);
  if (D === weights.length) return maxWeight;

  let wrong = maxWeight - 1;
  let right = total;

  // const days = weights.map((weight, index) => ({
  //   sum: weight,
  //   start: index,
  //   end: index + 1,
  // }));

  while(wrong < right - 1) {
    const middle = Math.ceil((wrong + right) / 2);
    
    let s = 0;
    let day = 1;
    for (const w of weights) {
      if (day > D) {
        break;
      }
      if (s + w > middle) {
        s = 0;
        day += 1;
      }

      s += w;
    }

    if (day > D) {
      wrong = middle;
    } else {
      right = middle;
    }
    
  }

  return right;
};
// @lc code=end

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5));

console.log(shipWithinDays([3,2,2,4,1,4], 3))

console.log(shipWithinDays([1,2,3,1,1], 4))
