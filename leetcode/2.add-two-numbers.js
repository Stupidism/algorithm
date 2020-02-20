const assert = require('assert');

function ListNode(val, next) {
  this.val = val;
  this.next = next;
  this.toString = () => {
    if (!this.next) return this.val.toString();
    return `${this.next.toString()}${this.val}`;
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const zero = new ListNode(0);
const one = new ListNode(1);

var addTwoNumbers = function(l1, l2, overflow = zero) {
  if (!l1) return overflow === one ? addTwoNumbers(l2, overflow) : l2;
  if (!l2) return overflow === one ? addTwoNumbers(l1, overflow) : l1;

  const sum = l1.val + l2.val + overflow.val;
  const list = new ListNode(sum % 10);
  list.next = addTwoNumbers(l1.next, l2.next, sum >= 10 ? one : zero);

  return list;
};

let a = new ListNode(5);
a = new ListNode(4, a);
a = new ListNode(2, a);

let b = new ListNode(4);
b = new ListNode(6, b);
b = new ListNode(5, b);

assert.deepEqual(addTwoNumbers(a, b).toString(), '1007');
