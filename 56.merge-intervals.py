from typing import List
import math

class Solution:
  def __init__(self):
    self.intervals = []
  
  def merge(self, intervals: List[List[int]]) -> List[List[int]]:
    for interval in intervals:
      self.add(interval)

    return self.intervals

  def add(self, interval):
    # print('\n')
    if (not len(self.intervals)):
      self.intervals.append(interval)
      # print('intervals', self.intervals)
      return

    left, right = interval
    leftIndex = self.findLeftIndex(left)
    rightIndex = self.findRightIndex(right)

    # print('add', left, right, leftIndex, rightIndex)

    if (leftIndex == rightIndex == 0 or leftIndex == rightIndex == len(self.intervals)):
      self.intervals[leftIndex:rightIndex] = [[left, right]]
    else:
      self.intervals[leftIndex:rightIndex] = [[
        min(left, self.intervals[leftIndex][0]),
        max(right, self.intervals[rightIndex - 1][1]),
      ]]
    # print('intervals', self.intervals)

  def findLeftIndex(self, target):
    return self._findLeftIndex(target, 0, len(self.intervals))

  def _findLeftIndex(self, target, left, right):
    diff = right - left
    if (diff == 0):
      return left
    if (diff == 1):
      return left if target <= self.intervals[left][1] else right
    middle = left + math.floor(diff / 2)
    
    if(target >= self.intervals[middle][0]):
      return self._findLeftIndex(target, middle, right)
    return self._findLeftIndex(target, left, middle)

  def findRightIndex(self, target):
    return self._findRightIndex(target, 0, len(self.intervals))

  def _findRightIndex(self, target, left, right):
    diff = right - left
    if (diff == 0):
      return right
    if (diff == 1):
      return left if target < self.intervals[left][0] else right
    middle = left + math.floor(diff / 2)
    
    # print('findRightIndex', target, left, right, self.intervals[middle][1])
    if(target >= self.intervals[middle][0]):
      return self._findRightIndex(target, middle, right)
    return self._findRightIndex(target, left, middle)

Solution().merge([[3,4], [1,2], [1,2],[2,4],[8,10],[15,18], [3,8]])

class Solution2:
    def merge(self, intervals):
        intervals.sort(key=lambda x: x[0])

        merged = []
        for interval in intervals:
            # if the list of merged intervals is empty or if the current
            # interval does not overlap with the previous, simply append it.
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
            # otherwise, there is overlap, so we merge the current and previous
            # intervals.
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged
