const assert = require('assert');

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
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
var countUnivalSubtrees = function(root) {
  let count = 0;

  recursive(root);

  function recursive(node, parentValue) {
    if (!node) return parentValue;

    const leftLen = recursive(node.left, node.val);
    const rightLen = recursive(node.right, node.val);
    if (node.val === leftLen && node.val === rightLen) {
      count++;
      return node.val;
    }
    return null;
  }
  
  return count;
};

const tree = new TreeNode(5);
tree.left = new TreeNode(1, new TreeNode(5), new TreeNode(5));
tree.right = new TreeNode(5, null, new TreeNode(5));

assert.deepEqual(countUnivalSubtrees(tree), 4);
