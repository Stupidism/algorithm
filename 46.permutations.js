/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(values) {
  const used = [];
  const getPermutations = (nums, restAmount, used) => {
    if (restAmount === 1) {
      return [nums.filter((v, i) => !used[i])];
    }
    
    const permutations = [];
    nums.forEach((value, index) => {
      if (used[index]) return;
      used[index] = true;
      
      const subPerms = getPermutations(nums, restAmount - 1, used);
      // console.log('subPerms', subPerms, used);
      used[index] = false;

      
      subPerms.forEach(subPerm => {
        subPerm.unshift(value);
        permutations.push(subPerm);
      });
    });
    
    // console.log('permutations', permutations)

    return permutations;
  }
  
  return getPermutations(values, values.length, used);
};