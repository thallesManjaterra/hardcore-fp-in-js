const {
    toLower
    , trim
    , reverse
    , filter
    , gt
    , flip
    , compose
    , prop
    , map
    , tap
    , lt
    , split
    , join
} = require('ramda');

const doStuff_ =
    (s) =>
        s
        .toLowerCase()
        .split(' ')
        .map((c) => c.trim())
        .reverse()
        .filter(x => x.length > 3)
        .join(', ')

const result = doStuff_('    Thalles Manjaterra  ')
console.log(result)

const trace = tap(console.log);

const doStuff = compose(
    join(', ')
    , filter(flip(gt)(3))
    , reverse
    , map(trim)
    , split(' ')
    , toLower
);

const r = doStuff('    Thalles Manjaterra  ');
console.log(r)


















