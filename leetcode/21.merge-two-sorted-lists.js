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

var mergeTwoLists = function(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  const prehead = new ListNode(null);
  prehead.next = l1;

  let sortedNode = prehead;
  let node = l2;
  while(node && sortedNode) {
    const next = sortedNode.next;
    if (!next) {
      sortedNode.next = node;
      break;
    }
    if (node.val < next.val) {
      sortedNode.next = node;
      node = next;
    }
    sortedNode = sortedNode.next;
  }
   
  return prehead.next;
};
 
var mergeTwoLists1 = function(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  if(l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  }
  l2.next = mergeTwoLists(l1, l2.next);
  return l2
};
