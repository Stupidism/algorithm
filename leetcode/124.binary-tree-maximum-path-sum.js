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
 * @return {number}
 */
var maxPathSum = function(root) {
  let max = -Infinity;

  calcSinglePathSum(root);

  return max;

  function calcSinglePathSum(node) {
    if (!node) return 0;
    const left = calcSinglePathSum(node.left);
    const right = calcSinglePathSum(node.right);

    max = Math.max(max, node.val + left + right);

    return Math.max(0, node.val + Math.max(left, right));
  }
};

const tree3 = new TreeNode(2);
tree3.left = new TreeNode(-1);

assert.deepEqual(maxPathSum(tree3), 2);

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);

assert.deepEqual(maxPathSum(tree1), 6);

const tree2 = new TreeNode(-10);
tree2.left = new TreeNode(9);
tree2.right = new TreeNode(20);
tree2.right.left = new TreeNode(15);
tree2.right.right = new TreeNode(7);
assert.deepEqual(maxPathSum(tree2), 42);
