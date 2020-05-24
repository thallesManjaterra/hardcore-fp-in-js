const { compose } = require('ramda');

// const _compose = (...fns) => (x) => fns.reduceRight((r, fn) => fn(r), x);

const add = (x, y) => x + y;

const toUpper = str => str.toUpperCase();

const exclaim = str => str + '!';

const first = xs => xs[0];

// const compose = (f, g) => (x) => f(g(x));
// const compose = x => (exclaim(toUpper(x));

const loudFirst = compose(toUpper, first);

const shout = compose(exclaim, loudFirst);

console.log(shout('tears'));
