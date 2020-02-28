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
var reverseBetween = function(head, m, n) {
  if (head == null || m === n) {
    return head;
  }

  const sentinel = new ListNode(null);
  sentinel.next = head;

  let node = sentinel;
  let lastNode = null;
  let i = 0;

  while(i < m) {
    lastNode = node;
    node = node.next;
    i += 1;
  }
  
  const left = lastNode;
  const tail = node;

  while(i <= n) {
    const next = node.next;
    node.next = lastNode;
    lastNode = node;
    node = next;
    i += 1;
  }

  tail.next = node;
  left.next = lastNode;

  return sentinel.next;
};
