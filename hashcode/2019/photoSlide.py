import math

def mergeVerticalPhotos(rawPhotos, directions):
  hPhotos = []
  vPhotos = []
  for tags, index in rawPhotos:
    if (directions[index]):
      hPhotos.append(set(tags))
    else:
      vPhotos.append(set(tags))

  vPhotos.sort(key = len, reverse = True)
  
  left = 0 if len(vPhotos) % 2 == 0 else 1
  right = len(vPhotos) - 1
  while(left < right):
    hPhotos.append(vPhotos[left].union(vPhotos[right]))
    left += 1
    right -= 1

  return hPhotos

def photo_slide(fileName):
  inputFile = open(fileName + '.txt', 'r')

  lines = inputFile.readlines()
  N = int(lines[0])
  M = 0
  maxTagNum = 0
  
  rawPhotos = []
  directions = []
  idByTag = {}
  photoIdsByTagId = []

  def getId(index, tag):
    if tag not in idByTag:
      nonlocal M
      idByTag[tag] = M
      M += 1
      photoIdsByTagId.append([])
    photoIdsByTagId[idByTag[tag]].append(index)
    return idByTag[tag]

  for i in range(1, N + 1):
    words = lines[i][0:-1].split(' ')
    direction, tagNum = words[0:2]
    tagIds = list(map(lambda tag: getId(i, tag), words[2:]))
    directions.append(direction == 'H')
    rawPhotos.append((tagIds, i - 1))

  print('rawPhotos', rawPhotos)

  def cleanPhotos(photos):
    for i in range(len(photos)):
      photo = photos[i]
      tagIds = [tagId for tagId in photo[0] if len(photoIdsByTagId[tagId]) >= 2]
      photos[i] = (tagIds, photo[1])

  cleanPhotos(rawPhotos)
  print('cleaned rawPhotos', rawPhotos)

  rawPhotos = mergeVerticalPhotos(rawPhotos, directions)
  print('merged rawPhotos', rawPhotos)

  maxScore = math.floor(maxTagNum / 2)
  photosByScore = [[] for i in range(maxScore + 1)]

  for photo in rawPhotos:
    potentialMaxScore = math.floor(len(photo) / 2)
    photosByScore[potentialMaxScore].append(photo)

  totalScore = 0
  targetScore = maxScore
  curMaxScore = 0
  candidates = []
  curPhoto = photosByScore[maxScore].pop(0)
  res = [curPhoto]

  def slidePhotos(candidates, targetScore):
    nonlocal curPhoto
    nonlocal totalScore

    def calcScore(i):
      photo = candidates[i]
      commonLen = len(curPhoto.intersection(photo))
      return (min(commonLen, len(photo) - commonLen, len(curPhoto) - commonLen), len(photo), i)

    candidates.sort(key = len, reverse = True)
    while candidates:
      index = max(range(len(candidates)), key = calcScore)
      score = calcScore(index)[0]
      if (not score or score < targetScore - 1):
        return score
      res.append(candidates[index])
      curPhoto = candidates[index]
      del candidates[index]
      totalScore += score
  
    return targetScore

  for i in range(maxScore + 1):
    print('photosByScore', i, len(photosByScore[i]))

  while (targetScore > 0):
    photos = photosByScore[targetScore]

    print('targetScore', targetScore, totalScore)

    if (not photos):
      targetScore -= 1
      continue

    if (not candidates):
      candidates = photos
    else:
      if (targetScore > curMaxScore):
        slidePhotos(photos, targetScore + 1)
      candidates += photos
      
    curMaxScore = slidePhotos(candidates, targetScore)

    targetScore -= 1
  # print(res)

  return totalScore


  



def main():
  for fileName in [
    'a_example',
    # 'b_lovely_landscapes',
    # 'c_memorable_moments',
    # 'd_quite_big',
    # 'e_also_big',
  ]:
    print('total_score', photo_slide(fileName))

main()
