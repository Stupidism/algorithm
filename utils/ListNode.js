function ListNode(val, next) {
  this.val = val;
  this.next = next;
  this.toString = () => {
    if (!this.next) return this.val.toString();
    return `${this.next.toString()}${this.val}`;
  }
}
