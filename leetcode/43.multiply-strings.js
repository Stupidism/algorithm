const assert = require('assert');
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
  const res = new Array(num1.length + num2.length).fill(0);

  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const sum = num1[i] * num2[j] + res[i + j + 1];
      res[i + j + 1] = sum % 10;
      res[i + j] += Math.floor(sum / 10);
    }
  }

  return res.join('').replace(/^0+(?!$)/, '');
};

assert.deepEqual(multiply('123', '456'), '56088');
assert.deepEqual(multiply('2', '3'), '6');
assert.deepEqual(multiply('0', '0'), '0');

