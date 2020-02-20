class Solution:
  def totalFruit(self, tree) -> int:
    maxCount = 0
    lastType = None
    curType = None
    count = 0
    curCount = 0

    for treeType in tree:
      if (treeType == curType):
        curCount += 1
      elif (treeType == lastType):
        lastType,curType = curType, lastType
        curCount = 1
      else:
        lastType = curType
        curType = treeType
        count = curCount
        curCount = 1
        
      count += 1
      if (count > maxCount):
        maxCount = count

    # print('maxCount', maxCount)

    return maxCount
    
assert Solution().totalFruit([1,2,1]) == 3
assert Solution().totalFruit([0, 1,2, 2]) == 3
assert Solution().totalFruit([1,2,3,2,2]) == 4
assert Solution().totalFruit([3,3,3,1,2,1,1,2,3,3,4]) == 5
