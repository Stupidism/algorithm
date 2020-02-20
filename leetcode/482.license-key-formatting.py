from typing import List
import math

class Solution:
  def licenseKeyFormatting(self, S: str, K: int) -> str:
    s = ''.join(S.split('-')).upper()
    frags = []
    rest = len(s) % K
    if (rest):
      frags.append(s[0:rest])

    for i in range(rest, len(s), K):
      frags.append(s[i:i+K])

    # print('frags', frags)
    return '-'.join(frags)
    

assert Solution().licenseKeyFormatting("5F3Z-2e-9-w", 4) == "5F3Z-2E9W"
assert Solution().licenseKeyFormatting("2-5g-3-J", 2) == "2-5G-3J"
