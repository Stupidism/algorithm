const assert = require('assert');

/**
 * @param {number} num
 * @return {number}
 */

const cache = {};

var findIntegers = function(num) {
  if (cache[num]) return cache[num];
  let res;
  if (num <= 3) {
    res = Math.min(3, num + 1);
  } else {
    const exp = Math.log2(num + 1);
    const bitCount = Math.ceil(exp);
    const bigPart = Math.pow(2, bitCount - 1) - 1;
    const smallPart = num & bigPart;
  
    // console.log('num', num, exp, bitCount, bigPart, bigPart >> 2, smallPart);
  
    if (smallPart === 0) {
      res = 1 + findIntegers(bigPart);
    } else {
      // console.log('divide', bigPart - 1, Math.max(smallPart, ((bigPart >> 1) - 1)));
      res = findIntegers(bigPart) + findIntegers(Math.min(smallPart, ((bigPart >> 1))));
    }
  }

  // console.log('res', num, res);

  cache[num] = res;

  return res;
};


assert.deepEqual(findIntegers(5), 5);
assert.deepEqual(findIntegers(4), 4);
assert.deepEqual(findIntegers(3), 3);
assert.deepEqual(findIntegers(6), 5);
assert.deepEqual(findIntegers(7), 5);
assert.deepEqual(findIntegers(3), 3);
assert.deepEqual(findIntegers(1), 2);
