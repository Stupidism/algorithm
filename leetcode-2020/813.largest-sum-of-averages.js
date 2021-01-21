/*
 * @lc app=leetcode id=813 lang=javascript
 *
 * [813] Largest Sum of Averages
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumOfAverages = function(A, K) {
  const prefixSum = Array(A.length).fill(0);
  prefixSum.forEach((_v, i) => {
    prefixSum[i] = A[i] + (prefixSum[i - 1] || 0);
  });
  const avg = (start, end) => ((prefixSum[end] || 0) - (prefixSum[start] || 0)) / (end - start);
  const res = Array(A.length).fill(0).map((_v, i) => prefixSum[i] / (i + 1));
  // console.log('prefixSum', prefixSum);
  // console.log(res);

  for (let x = 1; x < K; x++) {
    
    for (let i = A.length - 1; i >= 0; i -=1) {
      res[i] = 0;
      // console.log('i', i);

      for (let j = 0; j < i; j+=1) {
        // console.log('a', res[i], res[j], avg(j, i));
        res[i] = Math.max(res[i], res[j] + avg(j, i));
      }
    }

    // console.log(res);
  }

  return res[A.length - 1];
}



console.log('res', largestSumOfAverages([9,1,2,3,9], 3));