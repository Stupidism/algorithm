from typing import List
import math
import json

class LFUNode(object):
  def __init__(self, key, value):
    self.key = key
    self.value = value
    self.prev = None
    self.next = None
    self.frequency = 1
  
  def __str__(self):
    return ':'.join([str(self.key), str(self.value)])

class LFUList(object):
  def __init__(self, frequency):
    self.size = 0
    self.head = LFUNode(None, None)
    self.tail = LFUNode(None, None)
    self.head.next = self.tail
    self.tail.prev = self.head
    self.prev = None
    self.next = None
    self.frequency = frequency

  def removeNode(self, node: LFUNode):
    node.prev.next = node.next
    node.next.prev = node.prev
    self.size -= 1

  def addNode(self, node: LFUNode):
    # print('head', self.head)
    node.prev = self.head
    node.next = self.head.next
    self.head.next.prev = node
    self.head.next = node
    self.size += 1

class LFUCache:
  def __init__(self, capacity: int):
    self.nodeCache = {}
    self.listCache = {}
    self.size = 0
    self.capacity = capacity
    self.head = LFUList(float('inf'))
    self.tail = LFUList(0)
    self.head.next = self.tail
    self.tail.prev = self.head

  def getNodeList(self, frequency):
    return self.listCache.get(frequency, None)

  def insertNodeListBefore(self, nodeList):
    prevList = self.getNodeList(nodeList.frequency + 1)
    if (prevList is not None):
      return prevList
    newList = LFUList(nodeList.frequency + 1)
    newList.next = nodeList
    newList.prev = nodeList.prev

    newList.next.prev = newList
    newList.prev.next = newList

    self.listCache[newList.frequency] = newList

    return newList

  def removeNodeList(self, nodeList):
    nodeList.prev.next = nodeList.next
    nodeList.next.prev = nodeList.prev
    del self.listCache[nodeList.frequency]

  def removeNode(self, node: LFUNode):
    nodeList = self.getNodeList(node.frequency)
    nodeList.removeNode(node)
    del self.nodeCache[node.key]
    self.size -= 1

    if (nodeList.size == 0):
      self.removeNodeList(nodeList)

  def addNode(self, node: LFUNode):
    nodeList = self.getNodeList(node.frequency)
    if (nodeList is None):
      nodeList = self.insertNodeListBefore(self.tail)
    nodeList.addNode(node)
    self.nodeCache[node.key] = node
    self.size += 1

  def addFrequencyToNode(self, node):
    nodeList = self.getNodeList(node.frequency)
    prevList = self.insertNodeListBefore(nodeList)
    node.frequency += 1
    nodeList.removeNode(node)
    if (nodeList.size == 0):
      self.removeNodeList(nodeList)
    prevList.addNode(node)

  def get(self, key: int) -> int:
    node = self.nodeCache.get(key, None)
    # print('get', node)
    if (node is None):
      return -1
    self.addFrequencyToNode(node)
    return node.value

  def put(self, key: int, value: int) -> None:
    node = self.nodeCache.get(key, None)
    if (node is not None):
      node.value = value
      self.addFrequencyToNode(node)
      return
    
    if(self.size == self.capacity):
      tailNodeList = self.tail.prev
      self.removeNode(tailNodeList.tail.prev)
    
    self.addNode(LFUNode(key, value))

cache = LFUCache(3)
cache.put(0, 0)
cache.get(0)
assert cache.get('a') == -1
cache.put('a', 1)
assert cache.get('a') == 1
cache.put('b', 1)
cache.put('c', 1)
cache.put('d', 1)
assert cache.get('b') == -1
assert cache.get('c') == 1
assert cache.get('d') == 1
cache.put('b', 2)
assert cache.get('b') == 2
cache.put('e', 1)
assert cache.get('a') == -1
assert cache.get('c') == -1

print(cache.listCache, cache.nodeCache)
print(cache.head.next, cache.head.next.head.next, cache.head.next.tail.prev)
print(cache.tail.prev, cache.tail.prev.head.next, cache.tail.prev.tail.prev, )