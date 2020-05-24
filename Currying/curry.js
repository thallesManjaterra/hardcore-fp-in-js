const add = (x, y) => x + y;

const curry = (f) => (x) => (y) => f(x, y);

const curriedAdd = curry(add);

const increment = curriedAdd(1);

const result = increment(5);

console.log(result);
