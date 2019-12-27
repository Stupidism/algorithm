/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */


const wordBreak = function(s, wordDict) {
  const cache = {};
  let maxLenghOfWord = 0;
  wordDict.forEach(word => {
    maxLenghOfWord = Math.max(word.length, maxLenghOfWord);
  });
  
  return wordBreakRecursive(s, wordDict, maxLenghOfWord);

  function wordBreakRecursive(s, wordDict, maxLength) {
    if (cache[s]) return cache[s];
    // console.log('wordBreakRecursive', s);
    const max = Math.min(maxLength, s.length);
    const results = [];
    for(let len = 1; len <= max; len += 1) {
      const word = s.substr(0, len);
      // console.log('word', word, len, s.length, wordDict.includes(word));

      if (wordDict.includes(word)) {
        if (len === s.length) {
          results.push(word);
          continue;
        }

        wordBreakRecursive(s.substr(len), wordDict, maxLength).forEach(subResult => {
          results.push([word, subResult].join(' '));
        });
      }
    }

    console.log('results', results);

    cache[s] = results;

    return results;
  };
};


// console.log(wordBreak('catsanddog', ["cat", "cats", "and", "sand", "dog"]));
// console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]));
// console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));
console.log(wordBreak("aaa", ["a", "aa"]));
