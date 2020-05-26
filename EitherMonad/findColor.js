const { fromNullable } = require('./eitherMonad.js');
const R = require('ramda');

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
        );

console.log(result);
