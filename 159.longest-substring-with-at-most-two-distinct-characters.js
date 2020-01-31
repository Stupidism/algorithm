const assert = require('assert');

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
  let maxLen = 0;
  let start = -1;
  const charPositions = new Map();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const charPosition = charPositions.get(c);

    if (charPosition == null && charPositions.size === 2) {
      let charToRemove;
      for (const [char] of charPositions) {
        if (char !== s[i - 1]) {
          charToRemove = char;
        }
      };
      start = charPositions.get(charToRemove);
      charPositions.delete(charToRemove);
    } else {
      maxLen = Math.max(maxLen, i - start);
    }

    charPositions.set(c, i);
  }
  return maxLen;
};

assert.deepEqual(lengthOfLongestSubstringTwoDistinct('ccaabbb'), 5);
assert.deepEqual(lengthOfLongestSubstringTwoDistinct("eceba"), 3);
