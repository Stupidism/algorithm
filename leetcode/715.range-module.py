from typing import List
import math

class RangeModule:
  def __init__(self):
    self.starts = [0, 10**9]
    self.included = {}
    self.included[0] = False
    self.included[10**9] = False
  
  def __str__(self):
    res = ''
    for start in self.starts:
      if self.included.get(start):
        res += '[' + str(start) + ','
      elif start > 0:
        res += str(start) + '), '
    return res
  def addRange(self, left: int, right: int) -> None:
    print('\naddRange', left, right)
    self.setRange(left, right, True)

  def removeRange(self, left: int, right: int) -> None:
    print('\nremoveRange', left, right)
    self.setRange(left, right, False)

  def setRange(self, left: int, right: int, flag: bool) -> None:
    size = len(self.starts)
    rightIndex = self.findIndex(right, 0, size - 1)
    rightStart = self.starts[rightIndex]
    # print(self)

    if (self.included.get(rightStart) != flag):
      if (rightStart != right):
        self.starts.insert(rightIndex + 1, right)
      else:
        rightIndex -= 1
      self.included[right] = not flag
    leftIndex = self.findIndex(left, 0, size - 1)
    leftStart = self.starts[leftIndex]
    print(leftIndex, rightIndex)
    
    print(self)

    for i in range(rightIndex, leftIndex, -1):
      del self.starts[i]
    # print(self)
    

    if (self.included.get(leftStart) != flag):
      if (leftStart != left):
        self.starts.insert(leftIndex + 1, left)
        self.included[left] = flag
      elif (leftIndex != 0):
        del self.starts[leftIndex]
    print(self)

  def queryRange(self, left: int, right: int) -> bool:
    size = len(self.starts)
    leftIndex = self.findIndex(left, 0, size - 1)
    rightIndex = self.findIndex(right, 0, size - 1)
    rightStart = self.starts[rightIndex]

    if (leftIndex == rightIndex):
      return self.included.get(rightStart)
    if (rightIndex == leftIndex + 1 and right == rightStart):
      return not self.included.get(rightStart)
    return False

  def findIndex(self, target, left, right):
    diff = right - left
    if (diff == 0):
      return left
    if (diff == 1):
      return left
    middle = left + math.floor(diff / 2)
    if (target >= self.starts[middle]):
      return self.findIndex(target, middle, right)
    return self.findIndex(target, left, middle)

# rangeModule1 = RangeModule()
# rangeModule1.addRange(10, 20)
# assert rangeModule1.queryRange(5, 15) == False
# assert rangeModule1.queryRange(10, 15) == True
# assert rangeModule1.queryRange(15, 20) == True
# assert rangeModule1.queryRange(15, 25) == False
# assert rangeModule1.queryRange(5, 25) == False
# assert rangeModule1.queryRange(5, 1000) == False
# rangeModule1.addRange(15, 25)
# rangeModule1.addRange(5, 15)
# rangeModule1.addRange(3, 25)
# rangeModule1.addRange(3, 30)
# rangeModule1.removeRange(15, 25)
# rangeModule1.addRange(40, 50)
# assert rangeModule1.queryRange(20, 45) == False
# rangeModule1.addRange(20, 45)

rangeModule2 = RangeModule()
rangeModule2.addRange(10, 100)
rangeModule2.addRange(150, 200)
rangeModule2.addRange(250, 500)
rangeModule2.addRange(150, 200)
assert rangeModule2.queryRange(50, 100) == True
assert rangeModule2.queryRange(180, 300) == False
assert rangeModule2.queryRange(600, 1000) == False
rangeModule2.removeRange(150, 200)
assert rangeModule2.queryRange(10, 49) == True