/*
 * @lc app=leetcode id=688 lang=javascript
 *
 * [688] Knight Probability in Chessboard
 */

// @lc code=start
/**
 * @param {number} N
 * @param {number} K
 * @param {number} r
 * @param {number} c
 * @return {number}
 */

const sum = (nums) => nums.reduce((s, num) => s + num, 0);

const createArray2 = (m, n, value = 0) => Array(m).fill(null).map(() => Array(n).fill(value));

var knightProbability = function(N, K, r, c) {
  const matrixMultiply = (A, B) => {
    if (!A.length || A[0].length !== B.length) throw new Error('矩阵A的宽度必须等于矩阵B的高度');
    
    const res = createArray2(A.length, B[0].length, 0);
    for(let i = 0; i < A.length; i +=1) {
      for(let j = 0; j < B[0].length; j += 1) {
        res[i][j] = A[i].reduce((s, a, x) => s + a * B[x][j], 0);
      }
    }

    return res;
  }

  const matrixPow = (A, n) => {
    if (n === 1) return A;
    if (n % 2) {
      return matrixMultiply(matrixPow(A, n - 1), A);
    }

    const halfPow = matrixPow(A, n >> 1);
    return matrixMultiply(halfPow, halfPow);
  }

  const A2 = createArray2(N, N, 0);
  A2[r][c] = 1;
  const A = [].concat(...A2).map(v => [v]);

  const T = createArray2(A.length, A.length, 0);

  const moves = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]];

  for (let index = 0; index < A.length; index += 1) {
    const r = Math.floor(index / N);
    const c = index % N;

    moves.forEach(([dx, dy]) => {
      const i = r + dx;
      const j = c + dy;
  
      if (i < 0 || j < 0 || i >= N || j >= N) {
        return;
      }
      T[i * N + j][index] = 0.125;
    });
  }

  const TK = matrixPow(T, K);

  const B = matrixMultiply(TK, A);

  return sum(B.map(arr => sum(arr)));
};


console.log('res', knightProbability(25, 100, 0, 0))
// @lc code=end

