const assert = require('assert');

/**
 * @param {string} s
 * @return {boolean}
 */
var canPermutePalindrome = function(s) {
  const count = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    count.set(c, ((count.get(c) || 0) + 1));
  }

  let hasOdd = false;
  for (const c of count.values()) {
    if (c % 2 === 1) {
      if (hasOdd) {
        return false;
      }
      hasOdd = true;
    }
  }

  return true;
};

assert.deepEqual(canPermutePalindrome('code'), false);
assert.deepEqual(canPermutePalindrome('aab'), true);
assert.deepEqual(canPermutePalindrome('carerac'), true);
