const R = require('ramda');
const Box = require('./Box');

const nextCharForNumberString_ = (str) => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = Number(number + 1);
    return String.fromCharCode(nextNumber);
};

const nextCharForNumberString = (str) =>
    Box(str)
        .map(R.trim)
        .map(R.inc)
        .fold(R.invoker(1, 'fromCharCode')(R.__, String))

const result = nextCharForNumberString('     64  ');
console.log(result);

