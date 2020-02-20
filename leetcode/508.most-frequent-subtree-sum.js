const assert = require('assert');

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function(root) {
  const treeSums = new Map();
  let maxCount = 0;
  let res = [];

  calcTreeSum(root);
  return res;

  function calcTreeSum(node) {
    if (!node) return 0;
    const sum = calcTreeSum(node.left) + calcTreeSum(node.right) + node.val;

    const count = (treeSums.get(sum) || 0) + 1;

    if (count > maxCount) {
      res = [sum];
      maxCount = count;
    } else if (count === maxCount) {
      res.push(sum);
    }

    treeSums.set(sum, count);

    return sum;
  }
};

const tree1 = new TreeNode(5);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(-3);

assert.deepEqual(findFrequentTreeSum(tree1), [2, -3, 4]);

const tree2 = new TreeNode(5);
tree2.left = new TreeNode(2);
tree2.right = new TreeNode(-5);
assert.deepEqual(findFrequentTreeSum(tree2), [2]);
