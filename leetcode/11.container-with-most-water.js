/**
 * @param {number[]} height
 * @return {number}
 */

var maxArea = function(height) {
  let max = 0;
  
  for (let i = 0, j = height.length - 1; i < j;) {
    max = Math.max(max, Math.min(height[i], height[j]) * (j-i));
    // tryNewRange(i, j);
    if (height[i] < height[j]) {
      i += 1;
    } else {
      j -= 1;
    }
  }
  
  return max;
};