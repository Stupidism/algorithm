from typing import List
import math

class Solution:
  def __init__(self):
    self.oddPoints = []
    self.evenPoints = []

  def insert(self, point):
    oddIndex = self.findIndex(self.oddPoints, point)
    self.oddPoints.insert(oddIndex, point)

    evenPoint = (point[0], -point[1])
    evenIndex = self.findIndex(self.evenPoints, evenPoint)
    self.evenPoints.insert(evenIndex, evenPoint)
    return (oddIndex, evenIndex)

  def findIndex(self, points, point):
    left = 0
    right = len(points) - 1
    if (not len(points) or point < points[0]):
      return 0
    if (point > points[right]):
      return right + 1

    while(left + 1 < right):
      middle = left + math.floor((right - left) / 2)
      if (point < points[middle]):
        right = middle
      else:
        left = middle

    return right
  
  def oddEvenJumps(self, A: List[int]) -> int:
    size = len(A)
    target = size - 1
    odds = [None] * size
    evens = [None] * size
    odds[target] = target

    count = 1

    for i in range(size - 1, -1, -1):
      (oddIndex, evenIndex) = self.insert((A[i], i))
      if (oddIndex < len(self.oddPoints) - 1):
        nextEvenIndex = self.oddPoints[oddIndex + 1][1]
        odds[i] = target if evens[nextEvenIndex] == target else nextEvenIndex

        if (odds[i] == target):
          count += 1
      if (evenIndex > 0):
        nextOddIndex = - self.evenPoints[evenIndex - 1][1]
        evens[i] = target if odds[nextOddIndex] == target else nextOddIndex


    # print('odds', self.oddPoints, odds, evens)
    return count


assert Solution().oddEvenJumps([2,3,1,1,4]) == 3
assert Solution().oddEvenJumps([10,13,12,14,15]) == 2
assert Solution().oddEvenJumps([5,1,3,4,2]) == 3