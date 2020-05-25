// Identity functor
const Box = x => ({
    map: (f) => Box(f(x))
    , fold: (f) => f(x)
    , toString: `Box(${x})`
});

module.exports = Box;
