import math
import json

class TreeNode:
  def __init__(self, x):
    self.val = x
    self.left = None
    self.right = None

class Solution:
  def countNodes(self, root: TreeNode) -> int:
    if (root is None):
      return 0

    totalLevel = 1

    left = root

    while (left.left is not None):
      totalLevel += 1
      left = left.left

    emptyCount = 0

    def dfs(node, level):
      nonlocal emptyCount
      if (node.right is not None):
        dfs(node.right, level + 1)
      elif (level == totalLevel):
        raise ValueError()
      else:
        emptyCount += 1
        if (node.left is not None):
          raise ValueError()
        else:
          emptyCount += 1

      if (node.left is not None):
        dfs(node.left, level + 1)
      
    try:
      dfs(root, 1)
    except ValueError:
      return 2**totalLevel - 1 - emptyCount

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
# assert Solution().countNodes(root) == 3

root.left.left = TreeNode(2)
assert Solution().countNodes(root) == 4
root.left.right = TreeNode(2)
assert Solution().countNodes(root) == 5

root.right.left = TreeNode(2)

assert Solution().countNodes(root) == 6
