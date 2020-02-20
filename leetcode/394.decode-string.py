from typing import List

class Solution:
  def isNum(self, c: str):
    return '0' <= c <= '9'

  def isStr(self, c: str):
    return c != '[' and c != ']' and not self.isNum(c)

  def decodeString(self, s: str) -> str:
    res = ''
    stack = []

    start = 0
    curStr = ''
    curNum = 1
    end = 0
    size = len(s)
    while(end < size):
      c = s[end]
      if (self.isNum(c)):
        start = end
        while(self.isNum(s[end])):
          end += 1
        curNum = int(s[start:end])
      elif (c == '['):
        stack.append((curNum, curStr))
        curStr = ''
        end += 1
      elif (c == ']'):
        prevNum, prevStr = stack.pop()
        curStr = prevStr + curStr * prevNum
        if (not len(stack)):
          res += curStr
          curStr = ''
        end += 1
      else:
        start = end
        while(end < size and self.isStr(s[end])):
          end += 1
        curStr += s[start:end]

    # print('res', res)
    return res + curStr

assert Solution().decodeString("3[a]2[b4[F]c]") == "aaabFFFFcbFFFFc"
assert Solution().decodeString("2[abc]3[cd]ef") == "abcabccdcdcdef"
assert Solution().decodeString("3[a2[c]]") == "accaccacc"
assert Solution().decodeString("3[a]2[bc]") == "aaabcbc"
