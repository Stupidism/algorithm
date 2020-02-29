const assert = require('assert');

const dominoesCircle = (dominoes) => {
  if (!dominoes || !dominoes.length) {
    return [];
  }

  const pathsByFromNode = new Map();
  const pathNum = dominoes.length;

  const getNode = (key) => {
    if (!pathsByFromNode.has(key)) {
      pathsByFromNode.set(key, new Map());
    }
    return pathsByFromNode.get(key);
  }

  dominoes.forEach(([a ,b]) => {
    const node = getNode(a);
    getNode(b);
    node.set(b, (node.get(b) || 0) + 1);
  });

  // console.log('pathsByFromNode', pathsByFromNode);

  const res = [];

  const SuccessError = new Error('Success');

  const dfs = (from) => {
    // console.log('dfs', from, res);
    if (res.length === pathNum && res[0][0] === res[res.length - 1][1]) {
      throw SuccessError;
    }

    const fromNode = pathsByFromNode.get(from);

    fromNode.forEach((count, to) => {
      if (count <= 0) return;
      const newPath = [from, to];

      fromNode.set(to, count - 1);
      res.push(newPath);

      dfs(to);

      res.pop();
      fromNode.set(to, count);
    });
  }

  try {
    dfs(dominoes[0][0]);
  } catch (error) {
    if (error !== SuccessError) {
      throw error;
    }
  }

  // console.log('res', res);

  return res;
}

const main = (input) => {
  try {
    const json = `[${input.replace(/\(/g, '[').replace(/\)/g, ']')}]`;
    const dominoes = JSON.parse(json);

    const res = dominoesCircle(dominoes);
  
    const output = res.map(d => d.join('')).join(' ');
  
    return output;
  } catch(e) {
    console.error(e);
    return '';
  }
}

// Normal Valid
assert.deepStrictEqual(
  main('(1, 2), (2, 3), (3, 1)'), 
  '12 23 31',  
);

// Tail Invalid
assert.deepStrictEqual(
  main('(4, 1), (1, 2), (2, 3)'), 
  '',  
);

// Duplicate Dominos

assert.deepStrictEqual(
  main('(1, 2), (2, 4), (2, 3),(4, 3), (3, 1), (1, 2),  (3, 1)'), 
  '12 24 43 31 12 23 31',  
);

// Normal Invalid
assert.deepStrictEqual(
  main('(1, 2), (5, 3), (3, 1), (1, 2), (2, 4), (1, 6), (2, 3), (3, 4), (5, 6)'), 
  '',  
);
