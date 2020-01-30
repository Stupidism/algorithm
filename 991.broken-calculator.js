const assert = require('assert');

/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
var brokenCalc = function(X, Y) {
  if (Y <= X) {
    return X - Y;
  }

  if (((Y % 2) === 0)) {
    return brokenCalc(X, Y >> 1) + 1;
  }
  return brokenCalc(X, (Y + 1) >> 1) + 2;
};

assert.deepEqual(brokenCalc(2, 3), 2);
assert.deepEqual(brokenCalc(5, 8), 2);
assert.deepEqual(brokenCalc(3, 10), 3);
assert.deepEqual(brokenCalc(1024, 1), 1023);
