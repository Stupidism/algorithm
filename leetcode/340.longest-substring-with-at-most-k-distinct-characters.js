const assert = require('assert');

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function(s, k) {
  let maxLen = Math.min(s.length, k);
  let start = -1;
  const charPositions = new Map();

  let end;
  for (end = 0; end < s.length; end++) {
    const c = s[end];
    const charPosition = charPositions.get(c);
    // console.log('charPosition', c, start, charPosition, charPositions);

    if (charPosition == null && charPositions.size === k) {
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

assert.deepEqual(lengthOfLongestSubstringKDistinct('eceba', 2), 3);
assert.deepEqual(lengthOfLongestSubstringKDistinct('aabbccc', 3), 7);
assert.deepEqual(lengthOfLongestSubstringKDistinct("aa", 1), 2);
