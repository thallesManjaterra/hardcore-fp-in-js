const add = (x, y) => x + y;

const flip = (f) => (y, x) => f(x, y);

const x = flip(add)(1, 3);

console.log(x);

