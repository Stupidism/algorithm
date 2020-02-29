const assert = require('assert');

const order = (nodes) => {
  const graph = new Map();
  let firstId;
  let lastId;

  const lines = [];
  const ids = new Set();
  for (const node of nodes) {
    const { id, before, after, first, last } = node;
    graph.set(id, graph.get(id) || new Map());
    ids.add(id);

    if (first) {
      if (firstId != null) {
        return []
      }
      firstId = id;
    }
    if (last) {
      if (lastId != null) {
        return [];
      }
      lastId = id;
    }
    if (typeof before !== 'undefined') {
      lines.push([id, before]);
    }
    if (typeof after !== 'undefined') {
      lines.push([after, id]);
    }
  }

  // console.log('lines', lines);

  const inDegree = {};
  for (const line of lines) {
    const [a, b] = line;
    if (!graph.has(a) || b === firstId || a === lastId) {
      return []
    }
    graph.get(a).set(b, true);
    inDegree[b] = (inDegree[b] || 0) + 1;
  }

  // console.log('graph', graph);
  if (firstId) {
    ids.delete(firstId);
  }
  if (lastId) {
    ids.delete(lastId);
  }

  // console.log('ids', firstId, lastId, ids);

  const res = [firstId];

  while(ids.size) {
    let removed = false;
    const candidates = [...ids];
    // console.log('candidates', candidates, inDegree);
    for (const id of candidates) {
      if (!inDegree[id]) {
        ids.delete(id);
        removed = true;
        // console.log('remove', graph.get(id));
        graph.get(id).forEach((hasLine, nextId) => {
          // console.log('hasLine', hasLine, nextId)
          if (hasLine) {
            inDegree[nextId] -= 1;
          }
        });
        res.push(id);
      }
    }
    if (!removed) {
      break;
    }
  }

  // console.log('final ids', ids);

  if (ids.size) {
    return [];
  }

  res.push(lastId);
  return res;
};

// normal test case
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 1},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8},
  {id: 9},
]), [5,2,8,9,1,3,7,6]);

// two lasts
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 1},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8, last: true},
  {id: 9},
]), []);
// two firsts
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 1},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8, first: true},
  {id: 9},
]), []);
// before first
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 5},
  {id: 3, after: 1},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8},
  {id: 9},
]), []);
// after last
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 6},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8},
  {id: 9},
]), []);
// unknown id
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 1},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 10},
  {id: 8},
  {id: 9},
]), []);
// circle
assert.deepStrictEqual(order([
  {id: 1},
  {id: 2, before: 1},
  {id: 3, after: 7},
  {id: 5, first: true},
  {id: 6, last: true},
  {id: 7, after: 8},
  {id: 8, after: 7},
  {id: 9},
]), []);