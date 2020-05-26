const R = require('ramda');

const Right = x => ({
    chain: (f) => f(x)
    , map: (f) => Right(f(x))
    , fold: (f, g) => g(x)
    , toString: `Right(${x})`
});

const Left = x => ({
    chain: (f) => Left(x)
    , map: (f) => Left(x)
    , fold: (f, g) => f(x)
    , toString: `Left(${x})`
});

const fromNullable = R.ifElse(
    R.isNil
    , Left
    , Right
);

module.exports = {
    fromNullable
    , Right
    , Left
};

