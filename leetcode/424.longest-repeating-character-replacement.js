const assert = require('assert');

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  let start = 0;
  let end = start;
  let maxCount = 0;
  const count = new Map();

  while(end < s.length) {
    const c = s[end];
    const newCount = (count.get(c) || 0) + 1;
    count.set(c, newCount);
    maxCount = Math.max(newCount, maxCount);

    if (maxCount + k < end - start + 1) {
      count.set(s[start], count.get(s[start]) - 1);
      start++;
    }
    end++;
  }

  return s.length - start;
};
assert.deepEqual(characterReplacement("ABBB", 2), 4);
assert.deepEqual(characterReplacement("AAAA", 2), 4);
assert.deepEqual(characterReplacement("AABABBA", 1), 4);
assert.deepEqual(characterReplacement("ABAB", 2), 4);
assert.deepEqual(characterReplacement("IMNJJTRMJEGMSOLSCCQICIHLQIOGBJAEHQOCRAJQMBIBATGLJDTBNCPIFRDLRIJHRABBJGQAOLIKRLHDRIGERENNMJSDSSMESSTR", 2), 6);
