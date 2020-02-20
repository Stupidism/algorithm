class Solution:
  def shortestPalindrome(self, s: str) -> str: 
    ss = s + '#' + s[::-1]
    n = len(ss)
    next = [0] * n

    i = 1
    k = 0

    # print('ss', ss)
    while(i < n):
      # print('k', next, k, i)

      while(k > 0 and ss[k] != ss[i]):
        k = next[k - 1]

      if (ss[k] != ss[i]):
        k = 0
      else:
        k += 1
      next[i] = k
      i+=1

    end = next[n - 1] - 1

    # print(s[:end:-1] + s)

    return s[:end:-1] + s
    

      



assert Solution().shortestPalindrome('aacecaaa') == 'aaacecaaa'
assert Solution().shortestPalindrome('abcd') == 'dcbabcd'
