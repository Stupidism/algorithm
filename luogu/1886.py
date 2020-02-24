
def slideWindow(nums, windowSize):
  minQ = []
  maxQ = []
  minValues = []
  maxValues = []

  for i, num in enumerate(nums):
    while(minQ and nums[minQ[len(minQ) - 1]] > nums[i]):
      minQ.pop()
    minQ.append(i)

    while(maxQ and nums[maxQ[len(maxQ) - 1]] < nums[i]):
      maxQ.pop()
    maxQ.append(i)
    # print('i', i, num, list(map(lambda x: nums[x], minQ)))

    if (i >= windowSize - 1):
      # print('append', nums[minQ[0]])
      minValues.append(nums[minQ[0]])
      maxValues.append(nums[maxQ[0]])

    if (i - minQ[0] >= windowSize - 1):
      minQ.pop(0)
    if (i - maxQ[0] >= windowSize - 1):
      maxQ.pop(0)

  return (minValues, maxValues)

def main():
  n, windowSize = map(int, input().split( ))
  nums = list(map(int, input().split(' ')))

  minValues, maxValues = slideWindow(nums, windowSize)
  print(' '.join(list(map(str, minValues))))
  print(' '.join(list(map(str, maxValues))))


main()

# print(slideWindow(list(map(int, '1 3 -1 -3 5 3 6 7'.split(' '))), 3))