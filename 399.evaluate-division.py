from typing import List

class Solution:
  def __init__(self):
    self.graph = {}

  def addLine(self, start, end, value):
    if (self.graph.get(start, None) is None):
      self.graph[start] = {}
    self.graph[start][end] = value

  def constructGraph(self, equations, values):
    size = len(equations)

    for i in range(size):
      start, end = equations[i]
      value = values[i]
      self.addLine(start, end, value)
      if (value != 0):
        self.addLine(end, start, 1 / value)

  def calc(self, query):
    start, end = query
    visited = {}
    visited[start] = True
    graph = self.graph

    def dfs(key, division):
      visited[key] = True
      for nextKey in graph[key].keys():
        if (visited.get(nextKey, None) == True):
          continue
        lastDivision = division
        division *= graph[key][nextKey]
        if (end == nextKey):
          raise ValueError(division)
        dfs(nextKey, division)
        
        division = lastDivision

    if (graph.get(start, None) is None):
      return -1.0

    if (start == end): 
      return 1.0

    try:
      dfs(start, 1)
    except ValueError as err:
      return float(str(err))
    return -1
  
  def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
    self.constructGraph(equations, values)
    res = [self.calc(query) for query in queries]
    # print(self.graph)
    # print(res)
    return res

Solution().calcEquation(
  [["x1","x2"],["x2","x3"],["x3","x4"],["x4","x5"]],
  [3.0,4.0,5.0,6.0],
  [["x1","x5"],["x5","x2"],["x2","x4"],["x2","x2"],["x2","x9"],["x9","x9"]]
)
Solution().calcEquation([ ["a", "b"], ["b", "c"] ], [2.0, 3.0], [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ])
