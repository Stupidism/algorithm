const assert = require('assert');
/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.isLeaf = false;
  this.map = new Map();
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  if (!word.length) return;
  const c = word[0];
  if (!this.map.has(c)) {
    this.map.set(c, new Trie());
  }

  const rest = word.substr(1);
  if (rest.length) {
    this.map.get(c).insert(rest);
  } else {
    this.map.get(c).isLeaf = true;
  }
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  if (!word.length) return true;
  const c = word[0];
  if (!this.map.has(c)) {
    return false;
  }
  const rest = word.substr(1);

  if (rest.length) {
    return this.map.get(c).search(word.substr(1));
  } else {
    return this.map.get(c).isLeaf;
  }
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  if (!prefix.length) return true;
  const c = prefix[0];
  if (!this.map.has(c)) {
    return false;
  }
  return this.map.get(c).startsWith(prefix.substr(1));
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const trie = new Trie();

trie.insert("apple");
assert(trie.startsWith("app"));   
assert(!trie.search("app"));   
assert(trie.search("apple"));
assert(trie.search("apple"));   
trie.insert("app");   
assert(trie.search("app"));
