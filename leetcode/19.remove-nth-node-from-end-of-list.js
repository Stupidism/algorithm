/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

var removeNthFromEnd = function(head, n) {
  const prehead = new ListNode(null);
  prehead.next = head;

  let nthNode = prehead;
  for (let i = 0; i < n; i++) {
    nthNode = nthNode.next;
  }

  let node = prehead;
  while(nthNode.next) {
    nthNode = nthNode.next;
    node = node.next;
  }

  node.next = node.next.next;

  return prehead.next;
};

var removeNthFromEnd1 = function(head, n) {
  const prehead = new ListNode(null);
  prehead.next = head;

  const countAndRemove = (node) => {
    if (!node) return 0;

    const count = countAndRemove(node.next);

    // console.log('node', node.val, count);

    if (count === n) {
      node.next = node.next.next;
    }

    return count + 1;
  }
  return prehead.next;
};
