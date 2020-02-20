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
var sumNumbers = function(root) {
  let sum = 0;

  recursive(root);

  return sum;

  function recursive(node, parentVal = '') {
    if (!node) return;
    const val = (parentVal + node.val);
    if (!node.left && !node.right) {
      sum += parseInt(val);
      return;
    }

    recursive(node.left, val);
    recursive(node.right, val);
  }
};

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);

assert.deepEqual(sumNumbers(tree1), 25);

const tree2 = new TreeNode(4);
tree2.left = new TreeNode(9);
tree2.right = new TreeNode(0);
tree2.left.left = new TreeNode(5);
tree2.left.right = new TreeNode(1);
assert.deepEqual(sumNumbers(tree2), 1026);


// const tree3 = new TreeNode(2);
// tree3.left = new TreeNode(-1);

// assert.deepEqual(sumNumbers(tree3), 2);
