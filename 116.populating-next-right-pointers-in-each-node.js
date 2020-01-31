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
  let leftest = root;

  while(leftest) {
    let cur = leftest;
    leftest = cur.left;

    while(cur) {
      if (cur.left) {
        cur.left.next = cur.right;
        if (cur.next) {
          cur.right.next = cur.next.left;
        }
      }

      cur = cur.next;
    }
  }
  return root;
};

const tree = new Node(1);
tree.left = new Node(2, new Node(4), new Node(5));
tree.right = new Node(3, new Node(6), new Node(7));

connect(tree);

assert.strictEqual(tree.left.next, tree.right);
assert.strictEqual(tree.left.left.next, tree.left.right);
assert.strictEqual(tree.left.right.next, tree.right.left);
