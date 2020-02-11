class Solution:
  def strStr(self, haystack: str, needle: str) -> int:
    length = len(needle)
    if (length == 0):
      return 0
    next = [0] * length
    k = 0
    for i in range(1, length):
      print('next', k, i, next)
      while(k >0 and needle[i] != needle[k]):
        k = next[k-1]
      if (needle[i] == needle[k]):
        k += 1
      next[i] = k
    
    k = 0
    for i in range(len(haystack)):
      print('haystack', haystack[i:])
      print('needle', k, needle[(k):])
      while(k > 0 and haystack[i] != needle[k]):
        k = next[k-1]
      print('k', k)
      if (haystack[i] == needle[k]):
        k += 1
      if (k == length):
        return i - k + 1

    print('final next', next)
    return -1


print('result', Solution().strStr('aaaaa', 'bba'))
