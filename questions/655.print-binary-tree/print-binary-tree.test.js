const assert = require('assert');
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[][]}
 */

const getHeight = node => {
  if (node == null) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

var printTree = function(root) {
  const height = getHeight(root);
  const width = Math.pow(2, height) - 1;

  const result = [];
  let nodes = [root];

  let step = width + 1;
  for (let i = 0; i < height; i++) {
    result[i] = [];
    for (let j = 0; j < width; j++) {
      result[i][j] = '';
    }

    const newNodes = [];
    const start = step / 2 - 1;

    nodes.forEach((node, index) => {
      if (node == null) {
        newNodes.push(null, null);
        return;
      }

      result[i][start + index * step] = String(node.val);
      newNodes.push(node.left, node.right);
    });

    step /= 2;
    nodes = newNodes;
  }

  return result;
};

const tree1 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
}

assert.deepEqual(printTree(tree1), [["", "1", ""], ["2", "", ""]])
