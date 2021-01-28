// Question: How would you make this work?

// add(2, 5); // 7
// add(2)(5); // 7

// Question: What is the outcome of the two alerts below?

// var foo = "Hello";
// if(true) {
//  var bar = " World";
//  alert(foo + bar);
// };
// alert(foo + bar);

// Question: What is the value of foo.x?

// var foo = {n: 1};
// var bar = foo;
// foo.x = (foo = {n: 2});




// Question: What does the following code print?


// console.log('one');
// setTimeout(function() {
//   console.log('two');
// }, 0);
// console.log('three');


// Question  : In an integer array, there is 1 to 100 number, out of one is duplicate, how to find ?

// Question  : 
// Write a program that outputs all possibilities to put + or - or nothing between the numbers 1, 2, ..., 9 (in this order) such that the result is always 100. For example: 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.

// 1 + 2
// 1 - 2
// 12

type Results = Array<[number, number, ('+' | '-' | '')[]]>;

const find100Possibilities = (N): Results => {
  if (N === 1) {
    return [[1, 1, ['+']]];
  }

  const prevPossibilities = find100Possibilities(N - 1);

  const results: Results = [];

  prevPossibilities.forEach(([value, lastNumber, path]) => {
    results.push([value + N, N, [...path, '+']]);
    results.push([value - N, N, [...path, '-']]);

    let lastOperatorIndex = path.length - 1;
    while(!path[lastOperatorIndex]) {
      lastOperatorIndex -= 1;
    }

    const newNumber = lastNumber * 10 + N;
    if (path[lastOperatorIndex] === '+') {
      results.push([value - lastNumber + newNumber, newNumber, [...path, '']]);
    } else {
      results.push([value + lastNumber - newNumber, newNumber, [...path, '']]);
    }
  });

  return results;
}

const find100PossibilitiesForN = (N: number, target: number = 100) => {
  const possibilities = find100Possibilities(N);
  // console.log('possibilities: ', possibilities);

  possibilities.forEach(([value, , path]) => {
    if (value === target) {
      const expression = [];

      for (let i = 1; i <= N; i += 1) {
        expression.push(i);
        const operator = path[i];
        expression.push(operator ? ` ${operator} ` : '');
      }
      console.log(value, path, expression.join(''), eval(expression.join('')));
    }
  })
}

// find100PossibilitiesForN(2, 3);
find100PossibilitiesForN(9);

// 于济南
