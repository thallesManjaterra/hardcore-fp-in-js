const R = require('ramda');

const nextCharForNumberString_ = (str) => {
    const trimmed = str.trim();
    const number = parseInt(trimmed);
    const nextNumber = Number(number + 1);
    return String.fromCharCode(nextNumber);
};

// Identity functor
const Box = x => ({
    map: (f) => Box(f(x))
    , fold: (f) => f(x)
    , toString: `Box(${x})`
});

const nextCharForNumberString = (str) =>
    Box(str)
        .map(R.trim)
        .map(R.inc)
        .fold(R.invoker(1, 'fromCharCode')(R.__, String))


const result = nextCharForNumberString('     64  ');
console.log(result);

