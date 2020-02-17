# """
# This is the robot's control interface.
# You should not implement it, or speculate about its implementation
# """
# class Robot:
#    def move(self):
#        """
#        Returns true if the cell in front is open and robot moves into the cell.
#        Returns false if the cell in front is blocked and robot stays in the current cell.
#        :rtype bool
#        """

#    def turnLeft(self):
#        """
#        Robot will stay in the same cell after calling turnLeft/turnRight.
#        Each turn will be 90 degrees.
#        :rtype void
#        """

#    def turnRight(self):
#        """
#        Robot will stay in the same cell after calling turnLeft/turnRight.
#        Each turn will be 90 degrees.
#        :rtype void
#        """

#    def clean(self):
#        """
#        Clean the current cell.
#        :rtype void
#        """


class Solution:
  def cleanRoom(self, robot):
    self.robot = robot
    visited = set()
    directions = [(0, -1), (1, 0), (0, 1), (-1, 0)]

    def dfs(i, j, curDirIndex):
      robot.clean()
      visited.add((i, j))
      for dd in range(4):
        dirIndex = (curDirIndex + dd) % 4
        di, dj = directions[dirIndex]
        ni, nj = i + di, j + dj
        if ((ni, nj) not in visited and robot.move()):
          dfs(ni, nj, dirIndex)
          robot.turnRight()
          robot.turnRight()
          robot.move()
          robot.turnLeft()
        else:
          robot.turnRight()

    dfs(0, 0, 0)