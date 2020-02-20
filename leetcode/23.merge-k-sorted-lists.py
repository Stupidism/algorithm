from typing import List
import heapq

class ListNode:
  def __init__(self, x):
    self.val = x
    self.next = None

  def __lt__(self, other):
    return self.val < other.val

class Solution:
  def mergeKLists(self, lists: List[ListNode]) -> ListNode:
    head = ListNode(None)
    tail = head
    queue = []
    for index, lst in enumerate(lists):
      if (lst is not None):
        heapq.heappush(queue, (lst.val, index))

    while(len(queue)):
      index = heapq.heappop(queue)[1]
      lst = lists[index]
      lists[index] = lst.next
      tail.next = lst
      tail = lst
      if (lst.next is not None):
        heapq.heappush(queue, (lst.next.val, index))

    return head.next

lists = list(map(ListNode, [3,2,1,5,4]))
lists[0].next = ListNode(3)
lists[2].next = ListNode(6)
Solution().mergeKLists(lists)
