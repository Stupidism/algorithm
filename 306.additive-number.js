const assert = require('assert');
/**
 * @param {string} num
 * @return {boolean}
 */

const startWith0 = num => num.length > 1 && num[0] === '0';

const isAdditiveNumberOf = function (num, a, b) {
  if (num.length === 0) return true;
  const sum = String(Number(a) + Number(b));
  return num.startsWith(sum) && isAdditiveNumberOf(num.substr(sum.length), b, sum);
};

var isAdditiveNumber = function(num) {
  if (num.length < 3) return false;

  const maxEnd = Math.ceil(num.length / 3 * 2);
  for (let end = 2; end <= maxEnd; end++) {
    for (let i = 1; i < end; i++) {
      const a = num.substr(0, i);
      const b = num.substr(i, end - i);
      const newNum = num.substr(end);
      if (startWith0(a) || startWith0(b) || startWith0(newNum)) continue;
        
      if (isAdditiveNumberOf(newNum, a, b)) {
        return true;
      }
    }
  }

  return false;
};
assert(isAdditiveNumber('211738'));
assert(!isAdditiveNumber('1023'));
assert(isAdditiveNumber('000'));
assert(isAdditiveNumber('123'));
assert(isAdditiveNumber('112358'));
assert(isAdditiveNumber('199100199'));
