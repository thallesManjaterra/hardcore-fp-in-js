const { curry, compose, flip, toUpper, head } = require('ramda');

const add_ = (x, y) => x + y;

// const add = curry((x, y) => x + y);
const concat = flip(add); // All functions in Ramda are auto-curried.

const exclaim = concat('!');

const loudFirst = compose(toUpper, head);
const shout = compose(exclaim, loudFirst);

console.log(shout('tears'));


