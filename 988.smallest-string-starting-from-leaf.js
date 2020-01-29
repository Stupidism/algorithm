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
 * @return {string}
 */

const startCharCode = 'a'.charCodeAt(0);

var smallestFromLeaf = function(root) {
  let smallestLeafString = '{';

  recursive(root);

  return smallestLeafString;

  function recursive(node, parentStr = '') {
    if (!node) return;
    const str = String.fromCharCode(startCharCode + node.val) + parentStr;
    if (!node.left && !node.right) {
      smallestLeafString = str < smallestLeafString ? str : smallestLeafString;
      return;
    }

    recursive(node.left, str);
    recursive(node.right, str);
  }
};

const tree1 = new TreeNode(0);
tree1.left = new TreeNode(1);
tree1.right = new TreeNode(2);
tree1.left.left = new TreeNode(3);
tree1.left.right = new TreeNode(4);
tree1.right.left = new TreeNode(3);
tree1.right.right = new TreeNode(4);

assert.deepEqual(smallestFromLeaf(tree1), 'dba');

const tree2 = new TreeNode(25);
tree2.left = new TreeNode(1);
tree2.right = new TreeNode(3);
tree2.left.left = new TreeNode(1);
tree2.left.right = new TreeNode(3);
tree2.right.left = new TreeNode(0);
tree2.right.right = new TreeNode(2);
assert.deepEqual(smallestFromLeaf(tree2), "adz");


const tree3 = new TreeNode(2);
tree3.left = new TreeNode(2);
tree3.right = new TreeNode(1);
tree3.left.right = new TreeNode(1);
tree3.right.left = new TreeNode(0);
tree3.left.right.left = new TreeNode(0);
assert.deepEqual(smallestFromLeaf(tree3), "abc");