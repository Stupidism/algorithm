from typing import List
import math
import json

class LRUNode(object):
  def __init__(self, key, value):
    self.key = key
    self.value = value
    self.prev = None
    self.next = None
  
  def __str__(self):
    return ':'.join([str(self.key), str(self.value)])

class LRUCache:

  def __init__(self, capacity: int):
    self.cache = {}
    self.head = LRUNode(None, None)
    self.tail = LRUNode(None, None)
    self.head.next = self.tail
    self.tail.prev = self.head
    self.size = 0
    self.capacity = capacity

  def remove(self, node: LRUNode):
    # print('remove', node, self.cache.keys())
    node.prev.next = node.next
    node.next.prev = node.prev
    self.size -= 1
    del self.cache[node.key]

  def add(self, node: LRUNode):
    # print('head', self.head)
    node.prev = self.head
    node.next = self.head.next
    self.head.next.prev = node
    self.head.next = node

    self.cache[node.key] = node
    self.size += 1

  def moveToHead(self, node):
    self.remove(node)
    self.add(node)

  def get(self, key: int) -> int:
    node = self.cache.get(key, None)
    # print('get', node)
    if (node is None):
      return -1
    self.moveToHead(node)
    return node.value

  def put(self, key: int, value: int) -> None:
    node = self.cache.get(key, None)
    if (node is not None):
      node.value = value
      self.moveToHead(node)
      return
    
    if(self.size == self.capacity):
      self.remove(self.tail.prev)
    
    self.add(LRUNode(key, value))
        
obj = LRUCache(3)
# print('obj.head', obj.head, obj.tail)
assert obj.get('a') == -1
obj.put('a', 1)
assert obj.get('a') == 1
obj.put('b', 1)
obj.put('c', 1)
obj.put('d', 1)
assert obj.get('a') == -1
obj.put('b', 2)
obj.put('e', 1)
assert obj.get('b') == 2
assert obj.get('c') == -1
