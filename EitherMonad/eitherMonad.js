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

const findColor = (name) =>
    fromNullable(
        {
            red: '#ff4444'
            , blue: '#3b5998'
            , yellow: '#fff68f'
        }[name]
    );

const result =
    findColor('red')
        .map(R.toUpper)
        .fold(
            () => 'no color'
            , R.identity
        )

console.log(result);
