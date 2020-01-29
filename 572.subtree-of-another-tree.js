const assert = require('assert');

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */

var isSameTree = function(s, t) {
  if (s == null && t == null) return true;
  if (s == null || t == null) return false;
  return s.val === t.val && isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
}

var isSubtree = function(s, t) {
  if (!s || !t) return false;

  if (isSameTree(s, t)) {
    return true;
  }

  return isSubtree(s.left, t) || isSubtree(s.right, t);
};
