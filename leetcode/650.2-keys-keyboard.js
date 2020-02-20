const assert = require('assert');

/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */

/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
var minSteps = function(n, primeNumber = 2) {
  if (n == 1) {
    return 0;
  }
  const nextPrime = findNextPrimeNum(n);

  if (nextPrime) {
    return minSteps(n / nextPrime, nextPrime) + nextPrime;
  }
  return n;

  function findNextPrimeNum(n) {
    const max = Math.sqrt(n);
    for (let i = primeNumber; i <= max; i++) {
      if (n % i === 0) {
        return i;
      }
    }
    return null;
  }
};


assert.deepEqual(minSteps(6), 5);
assert.deepEqual(minSteps(3), 3);
assert.deepEqual(minSteps(5), 5);
