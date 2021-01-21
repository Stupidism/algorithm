// --
// Problem Set below:
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

type RangeType = [number, number];

class RangeNode {
  low: number;
  high: number;
  level: number;

  next: RangeNode[];

  constructor([low, high]: RangeType, level: number) {
    this.low = low;
    this.high = high;
    this.level = level;

    this.next = Array(level).fill(null);
  }

  toString() {
    return `[${this.low}, ${this.high})`;
  }
}

const DEFAULT_LEVEL = 6;

const getRandomLevel = () => {
  let level = 1;
  while(Math.random() > 0.5 && level < DEFAULT_LEVEL) {
    level += 1;
  }
  return level;
};

class RangeList {
  root: RangeNode;
  level: number;
  size: number;

  constructor(level = DEFAULT_LEVEL) {
    this.root = new RangeNode([-Infinity, -Infinity], level);
    this.level = level;
    this.size = 0;
  }

  find(target: number, includeTail?: boolean) {
    let prevNode = this.root;
    const prevNodes: RangeNode[] = [];
    for (let i = this.level - 1; i >= 0; i -= 1) {
      while (prevNode.next[i] && (target > prevNode.next[i].low || (includeTail && target === prevNode.next[i].low))) {
        prevNode = prevNode.next[i];
      }

      prevNodes.unshift(prevNode);
    }

    return prevNodes;
  }

  addNode(node: RangeNode, prevNodes: RangeNode[]) {
    for (let i = 0; i < node.level; i++) {
      node.next[i] = prevNodes[i].next[i];  
      prevNodes[i].next[i] = node;
    }
    this.size += 1;
  }

  removeNode(node: RangeNode, prevNodes: RangeNode[]) {
    for (let i = 0; i < node.level; i++) {
      prevNodes[i].next[i] = node.next[i];
    }
    this.size -= 1;
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range: RangeType) {
    const [low, high] = range;
    if (low === high) return;
    const lowNodes = this.find(low, true);
    const highNodes = this.find(high, true);

    if (lowNodes[0] !== highNodes[0]) {
      let node = lowNodes[0];
      
      while (node !== highNodes[0]) {
        const nextNode = node.next[0];
        this.removeNode(nextNode, lowNodes);
        node = nextNode;
      }
    }

    if (low > lowNodes[0].high) {
      const newLevel = getRandomLevel();
      const newNode = new RangeNode([low, Math.max(high, highNodes[0].high)], newLevel);
      this.addNode(newNode, lowNodes);
    } else if (high > lowNodes[0].high) {
      lowNodes[0].high = high;
    }
  }

 /**
 * Removes a range from the list
 * @param {Array<number>} range - Array of two integers that specify
beginning and end of range.
 */
  remove(range: RangeType) {
    const [low, high] = range;
    if (low === high) return;
    const lowNodes = this.find(low);
    const highNodes = this.find(high);

    if (lowNodes[0] !== highNodes[0]) {
      let node = lowNodes[0];

      while (node !== highNodes[0]) {
        const nextNode = node.next[0];
        this.removeNode(nextNode, lowNodes);
        node = nextNode;
      }
    }

    const tailRange: RangeType = [high, highNodes[0].high];
    if (low < lowNodes[0].high) {
      lowNodes[0].high = low;
    }

    if (high < tailRange[1]) {
      this.add(tailRange);
    }

  }

  toString(): string {
    const nodes = Array<RangeNode>(this.size).fill(null);
    let i = 0;
    while (i < this.size) {
      nodes[i] = (nodes[i - 1] || this.root).next[0];
      i += 1;
    }
    return nodes.map(node => node.toString()).join(' ');
  }
  /**
  * Prints out the list of ranges in the range list
  */
  print() {
    console.log(this.toString());
  }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([15, 17]);
rl.print();
// Should display: [1, 5) [15, 17)
rl.add([13, 16]);
rl.print();
// Should display: [1, 5) [13, 17]
rl.add([10, 11]);
rl.print();
// Should display: [1, 5) [10, 11) [13, 17]
rl.add([11, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)


rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)


rl.add([5, 7]);
rl.print();
// Should display: [1, 3) [5, 7] [19, 21)


rl.add([4, 8]);
rl.print();
// Should display: [1, 3) [4, 8] [19, 21)


rl.add([9, 10]);
rl.print();
// Should display: [1, 3) [4, 8) [19, 21)


rl.add([10, 11]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 10) [19, 21)


rl.add([13, 14]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [19, 21)


rl.add([16, 18]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [16, 18) [19, 21)

rl.add([25, 31]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [16, 18) [19, 21) [32, 64)

rl.add([32, 64]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64)

rl.add([100, 111]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [100, 111)

rl.add([88, 99]);
rl.print();
// Should display: [1, 3) [4, 8) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [88, 99) [100, 111)

rl.remove([4, 5]);
rl.print();
// Should display: [1, 3) [5, 8) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [88, 99) [100, 111)

rl.remove([7, 8]);
rl.print();
// Should display: [1, 3) [5, 7) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [88, 99) [100, 111)

rl.remove([7, 9]);
rl.print();
// Should display: [1, 3) [5, 7) [9, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [88, 99) [100, 111)

rl.remove([6, 10]);
rl.print();
// Should display: [1, 3) [5, 6) [10, 11) [13, 14) [16, 18) [19, 21) [25, 31) [32, 64) [88, 99) [100, 111)

rl.remove([5, 29]);
rl.print();
// Should display: [1, 3) [29, 31) [32, 64) [88, 99) [100, 111)