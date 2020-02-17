from typing import List

class NumMatrix:
  def __init__(self, matrix: List[List[int]]):
    M = len(matrix)
    if (not M):
      return
    N = len(matrix[0])
    self.matrix = matrix
    self.M = M
    self.N = N
    self.sums = [[0 for j in range(N + 1)] for i in range(M + 1)]

    for i in range(M):
      for j in range(N):
        value = matrix[i][j]
        # if (i == 0):
        #   self.sums[i][j] = self.sums[i][j - 1] + value
        # elif (j == 0):
        #   self.sums[i][j] = self.sums[i - 1][j] + value
        # else:
        self.sums[i][j] = self.sums[i][j - 1] + self.sums[i - 1][j] - self.sums[i - 1][j - 1] + value

    # list(map(print, self.sums))
    self.updates = []
        

  def update(self, row: int, col: int, val: int) -> None:
    diff = val - self.matrix[row][col]
    self.matrix[row][col] = val

    # for i in range(row, self.M):
    #   for j in range(col, self.N):
    #     self.sums[i][j] += diff

    self.updates.append((row, col, diff))

  def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
    # if (row1 == 0 and col1 == 0):
    #   return self.sums[row2][col2]
    # if (row1 == 0):
    #   return self.sums[row2][col2] - self.sums[row2][col1 - 1]
    # if (col1 == 0):
    #   return self.sums[row2][col2] - self.sums[row1 - 1][col2]

    res = self.sums[row2][col2] + self.sums[row1 - 1][col1 - 1] - self.sums[row1 - 1][col2] - self.sums[row2][col1 - 1]

    return res + sum([val for row, col, val in self.updates if row1 <= row <= row2 and col1 <= col <= col2])


numMatrix2 = NumMatrix([
  [1, 2],
])

assert numMatrix2.sumRegion(0,0,0,0) == 1
assert numMatrix2.sumRegion(0,1,0,1) == 2

numMatrix1 = NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
])

assert numMatrix1.sumRegion(0, 1, 0, 1) == 0
assert numMatrix1.sumRegion(2, 1, 4, 3) == 8
numMatrix1.update(3, 2, 2)
assert numMatrix1.sumRegion(2, 1, 4, 3) == 10