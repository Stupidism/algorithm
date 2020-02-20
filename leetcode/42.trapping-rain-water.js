const assert = require('assert');
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  if (height.length < 3) {
    return 0;
  }
  let maxIndex = 0;
  height.forEach((h, i) => {
    if (h > height[maxIndex]) {
      maxIndex = i;
    }
  });

  let rain = 0;

  let start = 0;
  for (let i = 1; i < maxIndex; i++) {
    rain += Math.max(0, height[start] - height[i]);
    if (height[i] > height[start]) {
      start = i;
    };
  }
  let end = height.length - 1;
  for (let j = height.length - 2; j > maxIndex; j--) {
    rain += Math.max(0, height[end] - height[j]);

    if (height[j] > height[end]) {
      end = j;
    }
  }
  return rain;
};

assert.deepEqual(trap( [0,1,0,2,1,0,1,3,2,1,2,1]), 6);
