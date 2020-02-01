const assert = require('assert');

/**
 * @param {string} s
 * @return {string[]}
 */
var generatePalindromes = function(s) {
  const countByChar = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    countByChar.set(c, (countByChar.get(c) || 0) + 1);
  }

  let oddStr = '';
  for (const [char, count] of countByChar) {
    if (count % 2 === 0) {
      countByChar.set(char, count / 2);
    } else {
      if (oddStr) {
        return [];
      }
      oddStr = char;
      countByChar.set(char, (count - 1) / 2);
    }
  }

  const path = [oddStr];
  const res = [];

  // console.log('countByChar', countByChar);

  generatePermutationsByCount();

  return res;

  function generatePermutationsByCount() {
    // console.log('path', path);
    if (path.length >= s.length) {
      res.push(path.join(''));
      return ;
    }

    for (const [char, count] of countByChar) {
      if (!count) continue;

      countByChar.set(char, count - 1);
      path.push(char);
      path.unshift(char);

      generatePermutationsByCount();
      
      // console.log('pop1', char, path);
      path.pop();
      path.shift();
      // console.log('pop2', char, path);
      countByChar.set(char, countByChar.get(char) + 1);
    }
  }
};

assert.deepEqual(generatePalindromes('aabbcc'), [ 'cbaabc', 'bcaacb', 'cabbac', 'acbbca', 'baccab', 'abccba' ]);
assert.deepEqual(generatePalindromes('aaabb'), ['baaab', 'ababa']);
assert.deepEqual(generatePalindromes('aaa'), ['aaa']);
assert.deepEqual(generatePalindromes("aabb"), ["baab", "abba"]);
assert.deepEqual(generatePalindromes('abc'), []);
