# """
# This is the robot's control interface.
# You should not implement it, or speculate about its implementation
# """
class Robot:
   def move(self):
       """
       Returns true if the cell in front is open and robot moves into the cell.
       Returns false if the cell in front is blocked and robot stays in the current cell.
       :rtype bool
       """

   def turnLeft(self):
       """
       Robot will stay in the same cell after calling turnLeft/turnRight.
       Each turn will be 90 degrees.
       :rtype void
       """

   def turnRight(self):
       """
       Robot will stay in the same cell after calling turnLeft/turnRight.
       Each turn will be 90 degrees.
       :rtype void
       """

   def clean(self):
       """
       Clean the current cell.
       :rtype void
       """

directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]

unknown = -1
blocked = 0
visited = 1

class Solution:
  def __init__(self):
    self.room = {}
    self.robot = None

  def getCell(self, i, j):
    if (self.room.get(i, None) is None):
      self.room[i] = {}
    if (self.room[i].get(j, None) is None):
      self.room[i][j] = unknown
    return self.room[i][j]

  def shouldIGo(self, i, j):
    cell = self.getCell(i, j)
    return cell == unknown or cell
  
  def clean(self, i, j):
    self.robot.clean()
    self.room[i][j] = visited

  def cleanRoom(self, robot):
    self.robot = robot

    def dfs(i, j, curDirIndex):
      self.clean(i, j)
      for dd in range(4):
        dirIndex = (curDirIndex + dd) % 4
        di, dj = directions[dirIndex]
        ni, nj = i + di, j + dj
        if (self.shouldIGo(ni, nj) and robot.move()):
          dfs(ni, nj, dirIndex)
          robot.turnRight()
          robot.turnRight()
          robot.move()
          robot.turnLeft()
        else:
          robot.turnRight()

    dfs(0, 0, 0)