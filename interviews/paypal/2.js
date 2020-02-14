const assert = require('assert');

function deduplicate(strs) {
  const map = {};

  strs.forEach(str => {
    map[str] = true;
  });

  return Object.keys(map);
}

assert.deepEqual(deduplicate(['a', 'b', 'c', 'a']), ['a', 'b', 'c']);

function sqrt(num) {
  if (num <= 1) return num;
  if (num <= 4) return 2;
  let left = 2;
  let right = Math.ceil(num / 2);

  while(left < right) {
    const middle = Math.floor((left + right) / 2);
    const product = middle * middle;

    if (product === num) return middle;
    if (product < num) {
      right = middle;
    } else {
      left = middle;
    }
  }

  return left;
}

assert.deepEqual(sqrt(25), 5);
assert.deepEqual(sqrt(26), 6);
