class Solution:
  def kEmptySlots(self, bulbs, K: int) -> int:
    N = len(bulbs)
    days = [None] * N
    for day, bulb in enumerate(bulbs):
      days[bulb - 1] = day + 1

    print('days', days)
    
    left = 0
    right = left + K + 1
    minDay = float('inf')

    while(right < N):
      for i in range(left + 1, right):
        if (days[i] < days[left] or days[i] < days[right]):
          left = i
          right = left + K + 1
          break
      else:
        minDay = min(minDay, max(days[left], days[right]))
        left = right
        right = left + K + 1

    if (minDay < N):
      print(minDay)
      return minDay
    return -1
    
assert Solution().kEmptySlots([9,1,4,2,8,7,5,3,6,10], 3) == 5
assert Solution().kEmptySlots([90,38,67,70,99,63,71,55,96,7,97,15,73,4,77,35,52,66,89,57,42,19,37,85,21,8,1,49,64,44,88,16,72,53,45,41,22,75,76,48,83,79,12,25,47,93,46,84,95,82,27,2,39,69,100,24,91,17,6,58,18,32,34,31,3,29,30,11,50,86,5,23,68,61,51,36,33,87,74,43,28,26,9,98,65,20,40,59,56,62,13,10,14,94,60,78,92,54,81,80],9) == 21
assert Solution().kEmptySlots([5,39,25,28,16,58,70,29,67,24,78,13,9,64,98,38,44,96,27,88,75,84,69,34,55,12,47,33,77,15,31,74,2,26,76,10,17,72,100,36,6,90,4,95,49,21,94,79,62,32,1,35,60,18,3,53,82,48,54,30,19,87,40,85,68,57,11,42,92,61,71,37,14,51,50,83,22,93,91,65,99,52,7,46,89,80,20,8,97,86,23,66,81,59,56,63,43,41,73,45], 4) == 17
assert Solution().kEmptySlots([6,5,8,9,7,1,10,2,3,4], 2) == 8
assert Solution().kEmptySlots([1,3,2], 1) == 2
assert Solution().kEmptySlots([1,2,3], 1) == -1
