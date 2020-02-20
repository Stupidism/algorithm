from typing import List
import math

class TimeSlot(object):
  def __init__(self, start, count = 0):
    self.start = start
    self.count = count
  
  def __str__(self):
    return str(self.start) + '[' + str(self.count) + ']'

class MyCalendarTwo:
  def __init__(self):
    self.timeSlots = [TimeSlot(0), TimeSlot(10**9)]

  def book(self, start: int, end: int) -> bool:
    size = len(self.timeSlots)
    left = self.findIndex(start, 0, size - 1)
    right = self.findIndex(end, 0, size - 1)

    print('\nbook', start, end, left, right)
    print('->'.join([slot.__str__() for slot in self.timeSlots]))

    for i in range(left, right + 1):
      slot = self.timeSlots[i]
      if (slot.count >= 2 and slot.start < end):
        return False

    rightSlot = self.timeSlots[right]
    print('rightSlot', rightSlot)

    if (end > rightSlot.start):
      self.timeSlots.insert(right + 1, TimeSlot(end, rightSlot.count))
      right += 1

    for i in range(right - 1, left, -1):
      self.timeSlots[i].count += 1

    print('->'.join([slot.__str__() for slot in self.timeSlots]))
    leftSlot = self.timeSlots[left]

    print('leftSlot', leftSlot)
    if (start > leftSlot.start):
      self.timeSlots.insert(left + 1, TimeSlot(start, leftSlot.count + 1))
    else:
      leftSlot.count += 1

    return True
  
  def findIndex(self, target, left, right):
    diff = right - left
    if (diff == 0):
      return left
    if (diff == 1):
      return left
    middle = left + math.floor(diff / 2)
    if (target >= self.timeSlots[middle].start):
      return self.findIndex(target, middle, right)
    return self.findIndex(target, left, middle)

calendar1 = MyCalendarTwo()
assert calendar1.book(10, 20) == True
assert calendar1.book(50, 60) == True
assert calendar1.book(10, 40) == True
assert calendar1.book(5, 15) == False
assert calendar1.book(5, 10) == True
assert calendar1.book(25, 55) == True

calendar2 = MyCalendarTwo()
inputs = [[24,40],[43,50],[27,43],[5,21],[30,40],[14,29],[3,19],[3,14],[25,39],[6,19]]
results = [True,True,True,True,False,False,True,False,False,False]
for i in range(len(inputs)):
  start, end = inputs[i]
  print('start', start, end, results[i])
  assert calendar2.book(start, end) == results[i]

calendar3 = MyCalendarTwo()
inputs = [[47,50],[1,10],[27,36],[40,47],[20,27],[15,23],[10,18],[27,36],[17,25],[8,17],[24,33],[23,28],[21,27],[47,50],[14,21],[26,32],[16,21],[2,7],[24,33],[6,13],[44,50],[33,39],[30,36],[6,15],[21,27],[49,50],[38,45],[4,12],[46,50],[13,21]]
results = [True,True,True,True,True,True,True,True,False,False,False,False,False,True,False,False,False,True,False,False,False,False,False,False,False,False,True,False,False,False]
for i in range(len(inputs)):
  start, end = inputs[i]
  print('start', start, end, results[i])
  assert calendar3.book(start, end) == results[i]
