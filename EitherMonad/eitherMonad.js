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


const findColor = (name) => {
const found =
    {
        red: '#ff4444'
        , blue: '#3b5998'
        , yellow: '#fff68f'
    }[name];
return found ? Right(found) :Left('notFound');
}

const result = () =>
    findColor('red')
        .map(R.toUpper)
        .map(R.slice(1, Infinity))
        .fold(
            () => 'no color'
            , R.identity
        )

console.log(result());
