from typing import List

class Solution:
  def minDominoRotations(self, A: List[int], B: List[int]) -> int:
    size = len(A)
    aCount = [0]*7
    bCount = [0]*7
    dupCount = [0]*7

    for i in range(size):
      if (aCount[A[i]] + bCount[A[i]] < i + dupCount[A[i]] and aCount[B[i]] + bCount[B[i]] < i + dupCount[B[i]]):
        return -1
      aCount[A[i]] += 1
      bCount[B[i]] += 1
      if (A[i] == B[i]):
        dupCount[A[i]] += 1

    # print(aCount, '\n', bCount, '\n', dupCount)

    res = size
    for num in [A[-1],B[-1]]:
      if (aCount[num] + bCount[num] == dupCount[num] + size):
        for faceCount in [aCount, bCount]:
          res = min(res, min(faceCount[num], size - faceCount[num]))

    return res

assert Solution().minDominoRotations([1,2,1,1,1,2,2,2], [2,1,2,2,2,2,2,2]) == 1
assert Solution().minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2]) == 2
assert Solution().minDominoRotations([3,5,1,2,3], [3,6,3,3,4]) == -1
