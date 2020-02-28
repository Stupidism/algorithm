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
var reverseList1 = function(head) {
  if (head == null) {
    return head;
  }
  let node = head;
  let lastNode = null;

  while(node.next) {
    const next = node.next;
    node.next = lastNode;
    lastNode = node;
    node = next;
  }

  node.next = lastNode;
  return node;
};

var reverseList = function(head, next = null) {
  if (head == null) {
    return next;
  }

  const node = head.next;
  head.next = next;
  return reverseList(node, head);
};

