const add = (x, y) => x + y;

const curry = (f) => (x) => (y) => f(x, y);

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

const result = isOdd(3);

console.log(result);
