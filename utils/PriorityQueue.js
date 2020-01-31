const assert = require('assert');

class PriorityQueue extends Array {
  constructor(priorityComparer) {
    super();
    this.values = [];
    this.priorityComparer = priorityComparer;
  }

  offer(val) {
    let index = this.values.length;
    let parent = this.getParent(index);
    this.values.push(val);
    while(index > 0 && this.isPriorityHigher(this.values[index], this.values[parent])) {
      this.swap(index, parent);
      index = parent;
      parent = this.getParent(index);
    }
  }

  poll() {
    this.swap(0, this.values.length - 1);
    const res = this.values.pop();
    let index = 0;
    let higherPriorityChild = this.getHigherPriorityChild(index);
    while(!this.isLeaf(index) && this.isPriorityHigher(this.values[higherPriorityChild], this.values[index])) {
      this.swap(index, higherPriorityChild);
      index = higherPriorityChild;
      higherPriorityChild = this.getHigherPriorityChild(index);
    }
    return res;
  }

  swap(a, b) {
    const d = this.values[a];
    this.values[a] = this.values[b];
    this.values[b] = d;
  }

  getParent(index) {
    return Math.floor((index - 1) / 2);
  }

  getHigherPriorityChild(index) {
    const left = 2 * index + 1;
    const right = left + 1;
    if (right >= this.values.length) {
      return left;
    }
    return this.isPriorityHigher(this.values[left], this.values[right]) ? left : right;
  }

  isPriorityHigher(a, b) {
    return this.priorityComparer(a, b) < 0;
  }

  isLeaf(index) {
    return 2 * index + 1 >= this.values.length;
  }

  size() {
    return this.values.length;
  }
}

var heap = new PriorityQueue((a, b) => a - b);

heap.offer(3);
heap.offer(2);
heap.offer(6);
heap.offer(1);

assert.deepEqual(heap.poll(), 1); 
assert.deepEqual(heap.poll(), 2); 
assert.deepEqual(heap.poll(), 3); 
assert.deepEqual(heap.poll(), 6); 
