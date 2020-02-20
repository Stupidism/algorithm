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
var rightSideView = function(root) {
  const res = [];
  if (!root) return res;
  const nodesInCurrentLevel = [root];

  while(nodesInCurrentLevel.length) {
    const len = nodesInCurrentLevel.length;
    res.push(nodesInCurrentLevel[0].val);

    for (let i = 0; i < len; i++) {
      const node = nodesInCurrentLevel.shift();
      if (node.right) nodesInCurrentLevel.push(node.right);
      if (node.left) nodesInCurrentLevel.push(node.left);
    }
  }

  return res;
};

const tree = new TreeNode(1);
tree.left = new TreeNode(2);
tree.right = new TreeNode(3);
tree.left.right = new TreeNode(5);
tree.right.right = new TreeNode(4);

assert.deepEqual(rightSideView(tree), [1, 3, 4]);
