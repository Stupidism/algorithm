from typing import List
import math

class Solution:
  def minTransfers(self, transactions: List[List[int]]) -> int:
    balanceById = {}
    for a, b, amount in transactions:
      balanceById[a] = balanceById.get(a, 0) + amount
      balanceById[b] = balanceById.get(b, 0) - amount

    # 算出余额, 剔除不欠钱的人
    balance = [balanceById[i] for i in balanceById if balanceById[i] != 0]

    # 开始时没人还钱
    count = 0
    # 从 2 个人圈子债开始找
    m = 2

    # 找 m 个人的集合来还钱
    while balance:
      N = len(balance)
      
      # 如果 m 个人有圈子债, 那剩下 n 个人也有圈子债, 所以当补集大小 n < m 直接得知当前是 N 人圈子债
      if (m > N / 2):
        return count + N - 1

      def findMSumTo0(people = [], start = 0): 
        # 每当排列组合找到了 m 个人
        if (m == len(people)):
          # 如果债务和为 0 那就返回当前 m 个人
          if (sum([balance[i] for i in people]) == 0):
            return people
          return None

        for i in range(start, N):
          # 尝试加入第 i 个人
          people.append(i)
          
          # 尝试继续招人
          res = findMSumTo0(people, start + 1)
          if (res is not None):
            return res

          # 把第 i 个人去掉, 继续寻找
          people.pop()
        
      # 找到当前 m 个 债务和为 0 的人
      people = findMSumTo0()

      # 找不到的话, m += 1
      if (people is None):
        m += 1
        continue

      # 找到了的话, 剔除这些人, 更新 count
      for i in people:
        balance[i] = 0
      balance = [i for i in balance if i != 0]
      
      # m 个人的圈子债, 需要转账 m - 1 次
      count += m - 1

    return count




assert Solution().minTransfers([[0,1,5],[0,2,5],[3,4,5],[3,5,5]]) == 4
assert Solution().minTransfers([[2,0,5],[3,4,4]]) == 2
assert Solution().minTransfers([[0,1,10], [1,0,1], [1,2,5], [2,0,5]]) == 1
assert Solution().minTransfers([[0,1,10], [2,0,5]]) == 2