/*
 * @lc app=leetcode id=576 lang=javascript
 *
 * [576] Out of Boundary Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number} N
 * @param {number} i
 * @param {number} j
 * @return {number}
 */


const createArray2 = (m, n, value = 0) => Array(m).fill(null).map(() => Array(n).fill(value));

var findPaths = function(m, n, N, si, sj) {
  const divider = 10 ** 9 + 7;
  const moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let A = createArray2(m, n, 0);
  let B = createArray2(m, n, 0);

  for(let x = 0; x < m; x += 1) {
    A[x][0] += 1;
    A[x][n - 1] += 1;
  }
  for(let y = 0; y < n; y += 1) {
    A[0][y] += 1;
    A[m - 1][y] += 1;
  }

  const p = (i, j) => {
    if (i < 0 || j < 0 || i >= m || j >= n) return 0;

    return A[i][j];
  };

  let res = 0;

    
  for(let step = 0; step < N; step += 1) {
    res = (res + p(si, sj)) % divider;
    for(let i = 0; i < m; i +=1) {
      for (let j = 0; j < n; j += 1) {
        B[i][j] = moves.reduce((s, [di, dj]) => s + p(i + di, j + dj), 0) % divider;
      }
    }

    [A, B] = [B, A];
  }

  return res;
};

console.log('res', findPaths(1,3,3,0,1));

// @lc code=end
