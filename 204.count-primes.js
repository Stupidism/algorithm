const assert = require('assert');

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
  const notPrimeNumber = [];
  const max = Math.sqrt(n);

  let count = n - 2;
  for (let i = 2; i < max; i++) {
    if (notPrimeNumber[i]) {
      continue;
    }

    for (let j = i * i; j < n; j += i ){
      if (!notPrimeNumber[j]) {
        notPrimeNumber[j] = true;
        count --;
      }
    }
  }

  return count;
};

assert.deepEqual(countPrimes(10), 4);
