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
var longestUnivaluePath = function(root) {
  let maxLen = 0;

  recursive(root);

  function recursive(node, parentValue) {
    if (!node) return 0;

    const leftLen = recursive(node.left, node.val);
    const rightLen = recursive(node.right, node.val);
    maxLen = Math.max(maxLen, leftLen + rightLen);
    return node.val === parentValue ? Math.max(leftLen, rightLen) + 1 : 0;
  }
  
  return maxLen;
};

const tree = new TreeNode(5);
tree.left = new TreeNode(4, new TreeNode(1), new TreeNode(1));
tree.right = new TreeNode(5, null, new TreeNode(5));

assert.deepEqual(longestUnivaluePath(tree), 2);

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(4, new TreeNode(4), new TreeNode(4));
tree1.right = new TreeNode(5, null, new TreeNode(5));

assert.deepEqual(longestUnivaluePath(tree1), 2);
