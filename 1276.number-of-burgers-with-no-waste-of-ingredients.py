class Solution:
  def numOfBurgers(self, tomatoSlices: int, cheeseSlices: int) -> List[int]:
    if (tomatoSlices % 2 == 1):
      return []
    
    jumboNum = int(tomatoSlices / 2 - cheeseSlices)
    smallNum = cheeseSlices - jumboNum

    if (jumboNum < 0 or smallNum < 0):
      return []

    return [jumboNum, smallNum]