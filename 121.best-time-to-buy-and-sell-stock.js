const assert = require('assert');
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let low = prices[0];
  let profit = 0;

  prices.forEach(price => {
    low = Math.min(low, price);
    profit = Math.max(profit, price - low);
  });

  return profit;
};

assert.deepEqual(maxProfit([7,1,5,3,6,4]), 5);
assert.deepEqual(maxProfit([7,6,4,3,1]), 0);
