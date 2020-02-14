class Solution:
  def lengthLongestPath(self, input: str) -> int:
    lines = input.split('\n')
    items = map(lambda line: line.split('\t'), lines)

    maxLen = 0
    frags = []
    curLen = -1

    for item in items:
      curTab = len(item) - 1
      frag = item[-1]
      
      while(curTab < len(frags)):
        curLen -= (len(frags.pop()) + 1)

      frags.append(frag)
      curLen += (len(frag) + 1)
      if (frag.find('.') != -1 and curLen > maxLen):
        maxLen = curLen

      # print('frags', frag, len(frag), curLen, '/'.join(frags))
    # print('maxLen', maxLen)
    return maxLen
    
assert Solution().lengthLongestPath("a") == 0
assert Solution().lengthLongestPath("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext") == 20
assert Solution().lengthLongestPath("dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext") == 32
