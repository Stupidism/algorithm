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

var pathSum = function(root, targetSum) {
  const res = [];
  const currentPath = [];

  recursive(root, targetSum);

  return res;

  function recursive(node, restVal) {
    if (!node) return;
    if (!node.left && !node.right && node.val === restVal) {
      res.push([...currentPath, node.val]);
      return;
    }
    const newRestVal = restVal - node.val;
    currentPath.push(node.val);
    recursive(node.left, newRestVal);
    recursive(node.right, newRestVal);
    currentPath.pop();
  }
};

const tree2 = new TreeNode(5);
tree2.left = new TreeNode(4);
tree2.right = new TreeNode(8);
tree2.left.left = new TreeNode(11);
tree2.left.left.left = new TreeNode(7);
tree2.left.left.right = new TreeNode(2);
tree2.right.left = new TreeNode(13);
tree2.right.right = new TreeNode(4);
tree2.right.right.left = new TreeNode(5);
tree2.right.right.right = new TreeNode(1);
assert.deepEqual(pathSum(tree2, 22), [
  [5,4,11,2],
  [5,8,4,5]
]);

