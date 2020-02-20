const assert = require('assert');
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

const DOT = '.';
const STAR = '*';

var isMatch = function(str, pat) {
  const cache = { 0 : { 0 : true }};
  return recursiveIsMatch(str, pat);

  function recursiveIsMatch (s, p) {
    // console.log('isMatch', {s, p}, cache);

    if (cache[p.length] && typeof cache[p.length][s.length] !== 'undefined') {
      return cache[p.length][s.length];
    }
    let i = 0;
    let j = 0;
    let res;

    const ret = (value) => {
      res = value;
      throw new Error();
    }

    try {
      while (j < p.length) {
        const m = p[j];
        // console.log('while1', i, j, s[i], p[j]);
        if (p[j + 1] !== STAR) {
          if ((m === DOT || m === s[i])) {
            j += 1;
            i += 1;
            if (i > s.length) {
              ret(false);
            }
            continue;
          } else {
            ret(false)
          }
        } else {
          j += 2;
          do {
            if (recursiveIsMatch(s.substr(i), p.substr(j))) {
              ret(true);
            }
            if (m === DOT || m === s[i]) {
              i += 1;
            } else {
              ret(false);
            }
          } while (i < s.length);
        }
      }
      res = i === s.length;
    } catch(e) {
      // console.log('error', e);
    }

    cache[p.length] = cache[p.length] || {};
    cache[p.length][s.length] = res;


    // console.log('res', s, p, res);

    return res;
  }
};

assert.deepEqual(isMatch('mississippi', 'mis*is*ip*.'), true);
assert.deepEqual(isMatch('a', '...*'), false);
assert.deepEqual(isMatch('aa', 'a*'), true);
assert.deepEqual(isMatch('aa', 'a'), false);
assert.deepEqual(isMatch('aa', '.*'), true);
assert.deepEqual(isMatch('aab', 'c*a*b'), true);
assert.deepEqual(isMatch('mississippi', 'mis*is*p*.'), false);
