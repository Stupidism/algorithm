import math
import heapq
import json

def getKey(key):
  return lambda x: x[key]

def main():
  for fileName in [
    # 'a_example',
    # 'b_read_on',
    # 'c_incunabula',
    # 'd_tough_choices',
    'e_so_many_books',
    # 'f_libraries_of_the_world',
  ]:
    inputFile = open('./input/' + fileName + '.txt', 'r')

    lines = inputFile.readlines()
    B, L, D = map(int, lines[0][:-1].split(' '))
    scoreByBook = list(map(int, lines[1][:-1].split(' ')))
    libs = [{} for i in range(L)]
    countByBook = [0] * B
    booksByLib = [[] for i in range(L)]
    libsByBook = [[] for i in range(B)]
    totalInitTime = 0
    
    for i in range(L):
      bookNum, initTime, speed = map(int, lines[2 * i + 2][:-1].split(' '))
      libs[i]['bookNum'] = bookNum
      libs[i]['initTime'] = initTime
      libs[i]['speed'] = speed
      libs[i]['score'] = 0
      libs[i]['id'] = i
      libs[i]['scanTime'] = math.floor(bookNum / speed)
      libs[i]['time'] = libs[i]['initTime'] + libs[i]['scanTime']
      totalInitTime += initTime

      books = list(map(int, lines[2 * i + 3][:-1].split(' ')))
      booksByLib[i] = books

      for book in books:
        libsByBook[book].append(i)
        libs[i]['score'] += scoreByBook[book]
        countByBook[book] += 1

    maxCount = max(countByBook)
    booksByCount = [[] for i in range((maxCount + 1))]

    for book in range(B):
      booksByCount[countByBook[book]].append(book)
    
    bookNumByCount = [0] * (maxCount + 1)
    for count in range(len(booksByCount)):
      bookNumByCount[count] = len(booksByCount[count])

    print('bookNumByCount', json.dumps(bookNumByCount, indent=2, sort_keys=True))

    stats = {}
    # stats['B'] = B
    stats['L'] = L
    stats['D'] = D

    stats['minInitTime'] = min(map(getKey('initTime'), libs))
    stats['maxInitTime'] = max(map(getKey('initTime'), libs))
    stats['avgInitTime'] = totalInitTime / L
    stats['expectLibs'] = math.floor(D / stats['avgInitTime'])

    stats['minCount'] = min(countByBook)
    stats['maxCount'] = maxCount
    stats['avgCount'] = sum(countByBook) / B

    print('stats', json.dumps(stats, indent=2, sort_keys=True))

    retBooksByLib = [[] for i in range(L)]

    def solveB():
      nonlocal retBooksByLib
      libs.sort(key = getKey('initTime'))
      retBooksByLib = booksByLib
      return 

    def solveC():
      nonlocal retBooksByLib
      libs.sort(key = lambda lib: (lib['initTime'], -lib['speed']))
      retBooksByLib = booksByLib
      return 

    def solveD():

      for lib in libs:
        libId = lib['id']
        books = booksByLib[libId]
        
        lib['score'] = sum(map(lambda book: scoreByBook[book] / countByBook[book],books))

      libs.sort(key = getKey('score'), reverse = True)

      return
    def solveE():
      for lib in libs:
        libId = lib['id']
        books = booksByLib[libId]
        speed = lib['speed']
        initTime = lib['initTime']

        avgScore = sum(map(lambda book: scoreByBook[book] / countByBook[book], books)) / len(books)
        
        print('lib', initTime, speed, avgScore)

        lib['score'] = (-initTime, speed, avgScore)
        booksByLib[libId].sort(key = lambda book: countByBook[book])

      libs.sort(key = getKey('score'), reverse = True)

    def solveF():
      nonlocal libs
      libs = [lib for lib in libs if lib['initTime'] < 50 and lib['speed'] > 5]
      print('len', len(libs))

      for lib in libs:
        libId = lib['id']
        books = booksByLib[libId]
        speed = lib['speed']
        initTime = lib['initTime']

        avgScore = sum(map(lambda book: scoreByBook[book] / countByBook[book], books)) / len(books)
        
        print('lib', initTime, speed, avgScore)

        lib['score'] = (speed, avgScore)
        booksByLib[libId].sort(key = lambda book: countByBook[book])

      libs.sort(key = getKey('score'), reverse = True)

    if (fileName[0] == 'b'):
      solveB()
    elif (fileName[0] == 'c'):
      solveC()
    elif (fileName[0] == 'd'):
      solveD()
    elif (fileName[0] == 'e'):
      solveE()
    else:
      solveF()

    def calcRetBooksByLib():
      startDay = 0
      scannedBook = [False] * B
      for resLibNum in range(len(libs)):
        lib = libs[resLibNum]
        if (startDay >= D):
          break
        startDay += lib['initTime']

        libId = lib['id']
        speed = lib['speed']
        books = booksByLib[libId]
        # print('startDay', startDay, speed)

        for i in range(len(books)):
          book = books[i]
          if (startDay + math.floor(i / speed) > D):
            break

          if not scannedBook[book]:
            scannedBook[book] = True
            retBooksByLib[libId].append(book)

    calcRetBooksByLib()

    def save():
      totalScore = 0
      startDay = 0
      scannedBook = [False] * B
      # print('libs', json.dumps(libs, indent=2, sort_keys=True))
      for resLibNum in range(len(libs)):
        lib = libs[resLibNum]
        if (startDay >= D):
          break
        startDay += lib['initTime']

        libId = lib['id']
        speed = lib['speed']
        books = retBooksByLib[libId]
        # print('startDay', startDay, speed)
        
        scannedCount = 0
        for i in range(len(books)):
          book = books[i]
          if (startDay + math.floor(scannedCount / speed) > D):
            break

          # print('book', i, scoreByBook[book])
          if not scannedBook[book]:
            scannedBook[book] = True
            scannedCount += 1
            totalScore += scoreByBook[book]


      # write output
      outputFile = open('./output/' + fileName + '.out', 'w+')
      outputFile.write(str(resLibNum + 1) + '\n')
      for i in range(resLibNum + 1):
        lib = libs[i]
        libId = lib['id']
        books = booksByLib[libId]
        outputFile.write(str(libId) + ' ' + str(len(books)) + '\n')
        outputFile.write(' '.join(map(str, books)) + '\n')
      print('totalScore', totalScore)

      outputFile.close()

    save()

main()
