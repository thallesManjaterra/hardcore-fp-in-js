const curry = (f) => (x) => (y) => f(x, y);

const modulo = curry((x, y) => y % x);

const isOdd = modulo(2);

const filter = curry((f, xs) => xs.filter(f));

const getOdds = filter(isOdd);

const result = getOdds([1, 2, 3, 4, 5]);

console.log(result);

