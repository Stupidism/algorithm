from typing import List
import math
import json

class Node(object):
  def __init__(self, value):
    self.value = value
    self.next = None

class Solution:
  def __init__(self):
    self.head = Node(-1)
    self.cache = {}

  def addCandidate(self, value):
    if (self.cache.get(value, None) is not None):
      return
    if (self.head.next is None):
      newNode = Node(value)
      newNode.next = newNode
      self.head.next = newNode
      self.cache[value] = newNode
      return
      
    newNode = Node(value)
    firstNode = self.head.next
    node = self.head.next
    while (node.next != firstNode):
      if (node.next.value > value > node.value):
        break
      node = node.next
    else:
      if (value < self.head.next.value):
        self.head.next = newNode

    newNode.next = node.next
    node.next = newNode
    self.cache[value] = newNode


  def findNext(self, value, max):
    node = self.cache.get(value, self.head)

    if (node.next.value > max):
      return min(self.head.next.value, value)

    return node.next.value

  def findMin(self):
    return self.head.next.value

  def nextClosestTime(self, time: str) -> str:
    hour, minute = time.split(':')
    digits = [0] * 4

    if (len(hour) == 1):
      digits[1] = int(hour)
    else:
      digits[1] = int(hour[1])
      digits[0] = int(hour[0])
      self.addCandidate(digits[0])

    self.addCandidate(digits[1])
    if (len(minute) == 1):
      digits[3] = int(minute)
    else:
      digits[3] = int(minute[1])
      digits[2] = int(minute[0])
      self.addCandidate(digits[2])
    self.addCandidate(digits[3])

    maxValues = [2, 3, 5, 9] if digits[0] == 2 else [2, 9, 5, 9]

    # print(self.head.next)
    # print(self.head.next.next)
    # print(self.head.next.next.next)
    # print(self.head.next.next.next.next)

    for i in range(3, -1, -1):
      digit = digits[i]
      maxValue = maxValues[i]
      nextDigit = self.findNext(digit, maxValue)
      if (nextDigit > digit):
        digits[i] = nextDigit
        break

    for j in range(i + 1, 4):
      if (self.head.next.value < digits[j]):
        digits[j] = self.head.next.value

    # print('digits', digits)

    return str(digits[0]) + str(digits[1]) + ':' + str(digits[2]) + str(digits[3])

assert Solution().nextClosestTime('5:59') == '09:55'
assert Solution().nextClosestTime('12:09') == '12:10'
assert Solution().nextClosestTime('12:9') == '12:11'
assert Solution().nextClosestTime('1:1') == '01:11'
assert Solution().nextClosestTime('19:34') == '19:39'
assert Solution().nextClosestTime('23:59') == '22:22'
assert Solution().nextClosestTime('01:34') == '01:40'
assert Solution().nextClosestTime('1:34') == '01:41'
assert Solution().nextClosestTime('1:11') == '11:11'
