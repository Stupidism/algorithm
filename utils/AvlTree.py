class TreeNode(object):
  def __init__(self, val, parent):
    self.val = val
    self.parent = parent
    self.left = None
    self.right = None
    self.height = 1

  def __str__(self):
    res = [['--' for t in range((2 ** self.height) - 1)] for i in range(self.height)]
    self.fillStringArray(res, 0, self.height)

    return '\n' + '\n'.join(map(lambda line: '[' + ' '.join(line) + ']', res))
  
  def fillStringArray(self, res, row, x, bias = 0):
    index = bias + 2 ** (x - 1) - 1
    res[row][index] = str(self.val)

    if (self.left is not None): 
      self.left.fillStringArray(res, row + 1, x - 1, bias)
    if (self.right is not None):
      self.right.fillStringArray(res, row + 1, x - 1, index + 1)

  def updateHeight(self):
    self.height = max(TreeNode.getHeight(self.left), TreeNode.getHeight(self.right)) + 1

  def setLeft(self, node):
    self.left = node
    self.updateHeight()
    if (node is None):
      return
    node.parent = self

  def setRight(self, node):
    self.right = node
    self.updateHeight()
    if (node is None):
      return
    node.parent = self
  
  def replaceChild(self, child, node):
    if (child == self.left):
      self.setLeft(node)
    elif (child == self.right):
      self.setRight(node)

  def findMax(self):
    if (self.right is None):
      return self.val
    return self.right.findMax()

  def findMin(self):
    if (self.left is None):
      return self.val
    return self.left.findMin()

  @classmethod
  def getHeight(cls, node):
    if (node is None):
      return 0
    return node.height

class AvlTree(object):
  def __init__(self):
    self.root = None

  def insert(self, val):
    if (self.root is not None):
      return self._insert(val, self.root)
    self.root = TreeNode(val, self)
    return self.root

  def _insert(self, val, node):
    if (val < node.val):
      if node.left is None:
        newNode = TreeNode(val, node)
        node.left = newNode
        self.balance(node)
        return newNode
      return self._insert(val, node.left)

    if node.right is None:
      newNode = TreeNode(val, node)
      node.right = newNode
      self.balance(node)
      return newNode
    return self._insert(val, node.right)

  def balance(self, node):
    node.updateHeight()
    parent = node.parent
    if (parent == self):
      return
    parentDiff = self.heightDiff(parent)
    if (parentDiff > 1):
      if (self.heightDiff(node) < 0):
        self.rotateRight(node)
      parent = self.rotateLeft(parent)
    elif parentDiff < -1:
      if (self.heightDiff(node) > 0):
        self.rotateLeft(node)
      parent = self.rotateRight(parent)
      
    self.balance(parent)
    
  def rotateLeft(self, node):
    parent = node.parent
    right = node.right

    node.setRight(node.right.left)
    right.setLeft(node)
    parent.replaceChild(node, right)

    return right

  def rotateRight(self, node):
    parent = node.parent
    left = node.left

    node.setLeft(node.left.right)
    left.setRight(node)
    parent.replaceChild(node, left)

    return left

  def replaceChild(self, child, node):
    self.root = node
    node.parent = self

  def findLeft(self, node):
    prev = node
    parent = prev.parent

    if (node.left is not None):
      return node.left.val

    while(parent != self and parent.left == prev):
      prev = parent
      parent = parent.parent

    if (parent == self):
      return float('-inf')

    return parent.val
    
  def findRight(self, node):
    prev = node
    parent = prev.parent

    if (node.right is not None):
      return node.right.val

    while(parent != self and parent.right == prev):
      prev = parent
      parent = parent.parent

    if (parent == self):
      return float('inf')
    
    return parent.val
    
  @classmethod
  def heightDiff(cls, node):
    return TreeNode.getHeight(node.right) - TreeNode.getHeight(node.left)
  
