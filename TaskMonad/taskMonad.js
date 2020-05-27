const { Task } = require('../types.js');
const R = require('ramda');
// functor lazy
//const Box = (f) => ({
    //map: (g) => Box(R.compose(f, g))
    //, fold: f
//});

//const x = Box(() => 2).map(two => two + 1).fold();

//console.log(x)

const t1 =
    Task(
        (rej, res) => res(2)
    )
    .chain(Task.of) // Task(Task(2))
    .map(R.inc)

// ================================
t1.fork(console.error, console.log);




