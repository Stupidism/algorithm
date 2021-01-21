/*
 * @lc app=leetcode id=935 lang=javascript
 *
 * [935] Knight Dialer
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const divider = 10**9 + 7;

const sum = (nums) => nums.reduce((s, num) => s + num, 0);

var knightDialer = function (n) {
  if (n === 1) {
    return 10;
  }
  const countByEnd = [1, 2, 1, 1];

  for(let step = 1; step < n; step += 1) {
    const [n0, n13, n2, n4] = countByEnd;

    countByEnd[0] = (n4 << 1) % divider;
    countByEnd[1] = ((n4 + n2) % divider << 1) % divider;
    countByEnd[2] = n13;
    countByEnd[3] = (n0 + n13) % divider;
  }
  
  return (sum(countByEnd) + sum(countByEnd.slice(1))) % divider;
};
// @lc code=end

