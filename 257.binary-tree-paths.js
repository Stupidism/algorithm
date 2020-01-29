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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const res = [];

  recursive(root);

  return res;

  function recursive(node, parentVal = '') {
    if (!node) return;
    const val = parentVal ? `${parentVal}->${node.val}` : String(node.val);
    if (!node.left && !node.right) {
      res.push(val);
      return;
    }

    recursive(node.left, val);
    recursive(node.right, val);
  }
};

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);

assert.deepEqual(binaryTreePaths(tree1), [ '1->2', '1->3' ]);
