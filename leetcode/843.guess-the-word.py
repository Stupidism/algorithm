from typing import List
import math

class Solution:
  @classmethod
  def calcDistance(self, a, b):
    count = 0
    for i in range(len(a)):
      if a[i] == b[i]:
        count += 1

    return count

  def constructDistanceDict(self, wordlist: List[str], indexList: List[str]):
    size = len(indexList)
    distanceDict = [[[] for i in range(0, 6)] for j in range(len(wordlist))]
    roughDegree = [(0,0)] * size

    for i in range(0, size):
      x = indexList[i]
      for j in range(i + 1, size):
        y = indexList[j]
        distance = self.calcDistance(wordlist[x], wordlist[y]) - 1
        distanceDict[x][distance].append(y)
        distanceDict[y][distance].append(x)

      roughDegree[i] = (max(map(len, distanceDict[x])), x)

    return (distanceDict, roughDegree)

  def findSecretWord(self, wordlist: List[str], master: 'Master') -> None:
    candidates = [i for i in range(len(wordlist))]
    while(len(candidates)):
      distanceDict, roughDegree = self.constructDistanceDict(wordlist, candidates)
      # print(distanceDict)
      bestCandidate = min(roughDegree)[1]
      distance = master.guess(wordlist[bestCandidate])
      if (distance == 6):
        return
      candidates = distanceDict[bestCandidate][distance - 1]
      # print('candidates', candidates)

class Master:
  def __init__(self, secret):
    self.secret = secret

  def guess(self, word: str) -> int:
    print('guess', word, Solution.calcDistance(self.secret, word))
    return Solution.calcDistance(self.secret, word)

Solution().findSecretWord(["gaxckt","trlccr","jxwhkz","ycbfps","peayuf","yiejjw","ldzccp","nqsjoa","qrjasy","pcldos","acrtag","buyeia","ubmtpj","drtclz","zqderp","snywek","caoztp","ibpghw","evtkhl","bhpfla","ymqhxk","qkvipb","tvmued","rvbass","axeasm","qolsjg","roswcb","vdjgxx","bugbyv","zipjpc","tamszl","osdifo","dvxlxm","iwmyfb","wmnwhe","hslnop","nkrfwn","puvgve","rqsqpq","jwoswl","tittgf","evqsqe","aishiv","pmwovj","sorbte","hbaczn","coifed","hrctvp","vkytbw","dizcxz","arabol","uywurk","ppywdo","resfls","tmoliy","etriev","oanvlx","wcsnzy","loufkw","onnwcy","novblw","mtxgwe","rgrdbt","ckolob","kxnflb","phonmg","egcdab","cykndr","lkzobv","ifwmwp","jqmbib","mypnvf","lnrgnj","clijwa","kiioqr","syzebr","rqsmhg","sczjmz","hsdjfp","mjcgvm","ajotcx","olgnfv","mjyjxj","wzgbmg","lpcnbj","yjjlwn","blrogv","bdplzs","oxblph","twejel","rupapy","euwrrz","apiqzu","ydcroj","ldvzgq","zailgu","xgqpsr","wxdyho","alrplq","brklfk"], Master('hbaczn'))
Solution().findSecretWord(["eykdft","gjeixr","eksbjm","mxqhpk","tjplhf","ejgdra","npkysm","jsrsid","cymplm","vegdgt","jnhdvb","jdhlzb","sgrghh","jvydne","laxvnm","xbcliw","emnfcw","pyzdnq","vzqbuk","gznrnn","robxqx","oadnrt","kzwyuf","ahlfab","zawvdf","edhumz","gkgiml","wqqtla","csamxn","bisxbn","zwxbql","euzpol","mckltw","bbnpsg","ynqeqw","uwvqcg","hegrnc","rrqhbp","tpfmlh","wfgfbe","tpvftd","phspjr","apbhwb","yjihwh","zgspss","pesnwj","dchpxq","axduwd","ropxqf","gahkbq","yxudiu","dsvwry","ecfkxn","hmgflc","fdaowp","hrixpl","czkgyp","mmqfao","qkkqnz","lkzaxu","cngmyn","nmckcy","alpcyy","plcmts","proitu","tpzbok","vixjqn","suwhab","dqqkxg","ynatlx","wmbjxe","hynjdf","xtcavp","avjjjj","fmclkd","ngxcal","neyvpq","cwcdhi","cfanhh","ruvdsa","pvzfyx","hmdmtx","pepbsy","tgpnql","zhuqlj","tdrsfx","xxxyle","zqwazc","hsukcb","aqtdvn","zxbxps","wziidg","tsuxvr","florrj","rpuorf","jzckev","qecnsc","rrjdyh","zjtdaw","dknezk"], Master('cymplm'))
Solution().findSecretWord(["ccbazz","eiowzz","acckzz","abcczz"], Master('abcczz'))