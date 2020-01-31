const assert = require('assert');

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function(s) {
  let maxLen = Math.min(s.length, 2);
  let start = -1;
  const charPositions = new Map();

  let end;
  for (end = 0; end < s.length; end++) {
    const c = s[end];
    const charPosition = charPositions.get(c);
    // console.log('charPosition', c, start, charPosition, charPositions);

    if (charPosition == null && charPositions.size === 2) {
      maxLen = Math.max(maxLen, end - start - 1);
      start = Math.min(...charPositions.values());
      // console.log('charToRemove', start, s[start]);
      charPositions.delete(s[start]);
    }

    charPositions.set(c, end);
  }
  maxLen = Math.max(maxLen, end - start - 1);

  return maxLen;
};

assert.deepEqual(lengthOfLongestSubstringTwoDistinct('ccaabbb'), 5);
assert.deepEqual(lengthOfLongestSubstringTwoDistinct("eceba"), 3);
