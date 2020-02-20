from typing import List
import math

class Solution:
  def threeSum(self, nums: List[int]) -> List[List[int]]:
    size = len(nums)
    nums.sort()
    if (size < 3 or nums[0] > 0 or nums[size - 1] < 0):
      return []

    maxNeg = 0
    minPos = size - 1
    while(maxNeg + 1 < minPos):
      middle = maxNeg + math.floor((minPos - maxNeg) / 2)
      if (nums[middle] > 0):
        minPos = middle
      elif (nums[middle] < 0):
        maxNeg = middle
      else:
        maxNeg = middle
        while maxNeg >=0 and nums[maxNeg] == 0:
          maxNeg -= 1
        minPos = middle
        while minPos < size and nums[minPos] == 0:
          minPos += 1
        break

    # print('maxNeg', maxNeg, minPos, nums)

    res = []

    def twoSum(left, right, targetIndex):
      target = -nums[targetIndex]
      i = left
      j = right
      while(i < j and i != targetIndex and j != targetIndex):
        iValue = nums[i]
        jValue = nums[j]
        sum = nums[i] + nums[j]
        if (sum == target):
          res.append([-target, nums[i], nums[j]])
        
        if (sum >= target):
          while(j >= 0 and nums[j] == jValue):
            j -= 1
        if (sum <= target):
          while(i < size and nums[i] == iValue):
            i += 1

    if (minPos - maxNeg > 3):
      res.append([0,0,0])
    
    zeroOrMinPos = minPos - 1 if nums[minPos - 1] == 0 else minPos

    lastNum = None
    for i in range(size):
      num = nums[i]
      if (lastNum == num):
        continue
      lastNum = num
      if (num < 0):
        twoSum(zeroOrMinPos, size - 1, i)
      elif (num > 0):
        twoSum(0, maxNeg, i)
    
    # print('res', res)

    return res

Solution().threeSum([1,1,-2])
# Solution().threeSum([-1,0,1,0])
# Solution().threeSum([0,0,0])
# Solution().threeSum([-1, 0, 1, 2, -1, -4])
