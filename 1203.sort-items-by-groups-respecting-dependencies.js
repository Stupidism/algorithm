const assert = require('assert');

/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} groupNums
 * @param {number[][]} beforeItems
 * @return {number[]}
 */

const graphSort = (items, befores) => {
  // console.log('sort', items, befores);
  const visited = [];
  items.forEach((itemNum) => {
    befores[itemNum].forEach(beforeNum => {
      visited[beforeNum] = (visited[beforeNum] || 0) + 1;
    });
  });

  const starts = [];
  items.forEach((itemNum) => {
    if (!visited[itemNum]) {
      starts.push(itemNum);
    }
  });

  const sortedItems = [];
  
  while(starts.length) {
    const start = starts.pop();
    befores[start].forEach(beforeNum => {
      visited[beforeNum] -= 1;
      if (visited[beforeNum] === 0) {
        starts.push(beforeNum);
      }
    });

    sortedItems.push(start);
  }

  visited.forEach(value => {
    if (value && value > 0) {
      throw new Error();
    }
  });

  // console.log('sortedItems', sortedItems);

  return sortedItems;
}

var sortItems = function(n, m, groupNums, beforeItems) {
  const groups = [];
  const beforeGroups = [];
  const itemIndexInGroup = [];

  // assign individul group numbers
  const getGroupNum = num => {
    if (groupNums[num] === -1) {
      groupNums[num] = num + m;
    }
    return groupNums[num];
  };
  
  // divide items into groups
  groupNums.forEach((groupNum, itemNum) => {
    const groupIndex = getGroupNum(itemNum);
    groups[groupIndex] = groups[groupIndex] || { items: [] };

    // record item's index inside group.items
    itemIndexInGroup[itemNum] = groups[groupIndex].items.length;
    // push item into group.items
    groups[groupIndex].items.push(itemNum);

    // calculate paths between groups
    beforeGroups[groupIndex] = beforeGroups[groupIndex] || [];

    // remove cross-group paths 
    beforeItems[itemNum] = beforeItems[itemNum].filter(beforeNum => {
      const beforeGroup = getGroupNum(beforeNum);

      // console.log('beforeGroup', itemNum, beforeNum, groupIndex, beforeGroup);
      if (groupIndex === beforeGroup) {
        return true;
      }

      // change a line between items to a line between groups
      beforeGroups[groupIndex].push(beforeGroup);

      // remove paths cross groups
      return false;
    });
  });

  // console.log('groups', groups);
  // console.log('beforeGroups', beforeGroups);

  try {
    const result = [];

    // sort groups by graphSort
    graphSort(Object.keys(groups), beforeGroups).map(groupIndex => {
      const group = groups[groupIndex];

      // console.log('group', groupIndex, group.items);

      // sort group.items by graphSort
      result.push(...graphSort(group.items, beforeItems));
    });

    // console.log('result', result);

    return result.reverse();
  } catch (e) {
    // console.log('error', e);
    return [];
  }
};


assert.deepEqual(sortItems(10, 4, [0,1,1,2,3,-1,0,0,0,1], [[2,5],[3,5,4,6,8,7,2],[7],[],[],[],[],[],[],[]]), []);

assert.deepEqual(sortItems(8, 2, [-1,-1,1,0,0,1,0,-1], [[],[6],[5],[6],[3],[],[4],[]]), []);

assert.deepEqual(sortItems(8, 2, [-1,-1,1,0,0,1,0,-1], [[],[6],[5],[6],[3,6],[],[],[]]), [ 5, 2, 0, 6, 3, 4, 1, 7 ]);
