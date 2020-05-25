const Box = require('./Box');
const R = require('ramda');

const first = (xs) => xs[0];

const halfFirstLargeNumber_ = xs => {
    const found = xs.filter((x) => x >= 20);
    const answer = first(found) / 2;
    return `The Answer is ${answer}`;
};

const some = R.curry((f, xs) => xs.some(f));

const halfFirstLargeNumber = xs =>
    Box(xs)
        .map(R.find(R.gte(R.__, 20)))
        .map(R.divide(R.__, 2))
        .map(R.toString)
        .fold(R.concat('The answer is '))


const result = halfFirstLargeNumber([1, 4, 50, 100, 10000, 5000]);

console.log(result);


