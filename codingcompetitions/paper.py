import heapq

def hIndex(N, papers):
  nextScore = 1
  candidates = []
  scores = []
  for paper in papers:
    if (paper >= nextScore):
      heapq.heappush(candidates, paper)
      while (len(candidates) >= nextScore and candidates[0] >= nextScore):
        nextScore += 1
      
      while (candidates and candidates[0] < nextScore):
        heapq.heappop(candidates)
    score = nextScore - 1
    scores.append(score)

  return scores
    

def main():
  C = int(input())
  res = []
  for i in range(C):
    N = int(input())
    papers = list(map(int, input().split(' ')))
    res.append(hIndex(N, papers))

  for i in range(len(res)):
    print('Case #' + str(i + 1) + ': ' + ' '.join(map(str, res[i])))

main()
