const assert = require('assert');

function Node(val, left, right, next) {
  this.val = val === undefined ? null : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
  this.next = next === undefined ? null : next;
}

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */


var connect = function(root) {
  const placeholder = new Node();
  placeholder.next = root;

  while(placeholder.next) {
    let cur = placeholder.next;
    placeholder.next = null;
    let left = placeholder;
    let right;
    while(cur) {
      right = cur.left;
      if (right) {
        left.next = right;
        left = right;
        right = null;
      }

      right = cur.right;
      if (right) {
        left.next = right;
        left = right;
        right = null;
      }
      cur = cur.next;
    }
  }
  return root;
};

const tree = new Node(1);
tree.left = new Node(2, new Node(4), new Node(5));
tree.right = new Node(3, undefined, new Node(7));

connect(tree);

assert.strictEqual(tree.left.next, tree.right);
assert.strictEqual(tree.left.left.next, tree.left.right);
assert.strictEqual(tree.left.right.next, tree.right.right);
