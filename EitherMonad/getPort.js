const R = require('ramda');
const fs = require('fs');
const path = require('path');
const { Right, Left, fromNullable } = require('./eitherMonad.js');

const pathConfig = R.invoker(2, 'resolve')('EitherMonad', R.__, path);

const tryCatch = (f) => {
    try {
        return Right(f())
    } catch (e) {
        return Left(e)
    }
};

const readFileSync = R.compose(
    R.invoker(1, 'readFileSync')(R.__, fs)
    ,  pathConfig
);

const getFileSync = (filename) => tryCatch(() => readFileSync(filename));

const parseJSON = (content) => tryCatch(() => R.invoker(1, 'parse')(content, JSON));

const getPort = (filename) =>
    getFileSync(filename)
        .chain(parseJSON)
        .map(R.prop('port'))
        .fold(
            () => 8080
            , R.identity
        )


const result = getPort('config.json');
console.log(result);
