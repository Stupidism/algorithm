/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let middle = head;
  let tail = head;

  while(tail && tail.next) {
    middle = middle.next;
    tail = tail.next.next;
  }

  return middle;
};