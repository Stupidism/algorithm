const assert = require('assert');

/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
  const values = {};

  const getRootObj = (valueObj) => {
    return valueObj.parent ? getRootObj(valueObj.parent) : valueObj;
  };

  for (let index = 0; index < equations.length; index++) {
    const equation = equations[index];
    if (equation[1] !== '=') continue;
    
    const leftVar = equation[0];
    const rightVar = equation[3];

    const left = values[leftVar] = getRootObj(values[leftVar] || values[rightVar] || { value: leftVar });
    const right = values[rightVar]  = getRootObj(values[rightVar] || values[leftVar]);
    if (left !== right) {
      right.parent = left;
    }
  } 

  for (let index = 0; index < equations.length; index++) {
    const equation = equations[index];
    if (equation[1] === '=') continue;
    const left = equation[0];
    const right = equation[3];

    if (left === right) return false;
    if (values[left] && values[right]) {
      if (getRootObj(values[left]).value === getRootObj(values[right]).value) {
        return false;
      }
    }
  }
  return true;
};


var equationsPossible1 = function(equations) {
  const values = {};

  const newValue = (value) => {
    return values[value] = {
      parent: null,
      value,
    }
  };

  const getRootValue = (value) => {
    if(values[value]) {
      return values[value].parent ? getRootValue(values[value].parent.value) : values[value];
    }
    return newValue(value);
  }

  for (let index = 0; index < equations.length; index++) {
    const equation = equations[index];
    if (equation[1] !== '=') continue;
    
    const left = equation[0];
    const right = equation[3];

    values[left] = values[left] || newValue(left);
    values[right] = getRootValue(right);
    values[right].parent = values[left];
  } 

  for (let index = 0; index < equations.length; index++) {
    const equation = equations[index];
    if (equation[1] === '=') continue;
    const left = equation[0];
    const right = equation[3];

    if (left === right) return false;
    if (values[left] && values[right]) {
      if (values[left].value === values[right].value) {
        return false;
      }
    }
  }
  return true;
};

assert(!equationsPossible(["g==c","f!=e","e==b","j==b","g!=a","e==c","b!=f","d!=a","j==g","f!=i","a==e"]));
assert(!equationsPossible(["a==b","e==c","b==c","a!=e"]));
assert(!equationsPossible(["c==a","f!=a","f==b","b==c"]));
assert(equationsPossible(["c==c","f!=a","f==b","b==c"]));
assert(!equationsPossible(["a==b","b!=a"]));
assert(!equationsPossible(["a==b","b!=c","c==a"]));
assert(!equationsPossible(["a!=a"]));
assert(equationsPossible(["b==a","a==b"]));
assert(equationsPossible(["a==b","b==c","a==c"]));
assert(equationsPossible(["c==c","b==d","x!=z"]));
