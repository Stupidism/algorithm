const assert = require('assert');

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  const middleLeft = Math.floor((s.length - 1) / 2);
  const middleRight = Math.floor(s.length / 2)
  let maxLen = 0;
  let maxLeft;

  let left = middleLeft;
  let right = middleRight;

  while(left >=0 && calcMaxPossibleLen(left, right) > maxLen) {
    checkPalindrome(left, right);
    checkPalindrome(s.length - 1 - left, s.length - 1 - right);

    if (left === right) {
      left--;
    } else if (left < right) {
      right--;
    }
  }

  return s.substr(maxLeft, maxLen);

  function checkPalindrome(curLeft, curRight) {
    let left = curLeft;
    let right = curRight;
    while(left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }


    const len = right - left - 1;
    if (len > maxLen) {
      maxLen = len;
      maxLeft = left + 1;
    }
  }

  function calcMaxPossibleLen(left, right) {
    if (left < s.length / 2) {
      return left * 2 + right - left + 1;
    } else {
      return (s.length - 1 - right) * 2 + right - left + 1;
    }
  }
};

assert.deepEqual(longestPalindrome('a'), "a");
assert.deepEqual(longestPalindrome('cbbd'), "bb");
assert.deepEqual(longestPalindrome('babad'), "aba");
