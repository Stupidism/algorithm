/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let i=0, j=nums.length -1; 
  const positions = {};
  
  while(i < nums.length) {
    const num = nums[i];
    const pairPosition = positions[target - num];
   
    console.log('num', num, pairPosition);

    if (pairPosition != undefined) {
      return [pairPosition, i];
    }
        
    positions[num] = i;
    i += 1;
  }
};

console.log(twoSum([2,7,11,15], 9));
