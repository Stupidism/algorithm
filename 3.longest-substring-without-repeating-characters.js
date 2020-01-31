const assert = require('assert');

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let maxLen = 0;
  let start = -1;
  const charPositions = new Map();

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const charPosition = charPositions.get(c);

    if (charPosition != null && start < charPosition) {
      start = charPosition;
    } else {
      maxLen = Math.max(maxLen, i - start);
    }

    charPositions.set(c, i);
  }
  return maxLen;
};

assert.deepEqual(lengthOfLongestSubstring('a'), 1);
assert.deepEqual(lengthOfLongestSubstring('abcabcbb'), 3);
assert.deepEqual(lengthOfLongestSubstring('bbbbb'), 1);
assert.deepEqual(lengthOfLongestSubstring('pwwkew'), 3);
