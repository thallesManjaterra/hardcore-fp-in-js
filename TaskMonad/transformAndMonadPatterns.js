const fs = require('fs');
const { Task, Either, Id } = require('../types.js');
const { Right, Left, fromNullable } = Either;
const { List, Map  } = require('immutable-ext')

const httpGet = (path, params) =>
    Task.of(`${path}: result`)

const getUser = (x) => httpGet('/user', { id: x })
const getTimeline = (x) => httpGet(`/timeline/${x}`, {})
const getAds = () => httpGet('/ads', {})

List([getUser, getTimeline, getAds])
    .traverse(Task.of, f => f())
    .fork(console.error, x => console.log(x.toJS()))

const greaterThan5 = (x) => x.length > 5 ? Right(x) : Left('not greater than 5');

const looksLikeEmail = (x) => x.match(/@/ig) ? Right(x) : Left('not an email');

const email = 'thalles.manjaterra@gmail.com';

const res =
    List([greaterThan5, looksLikeEmail])
    .traverse(Either.of, v => v(email))

res.fold(
    console.log
    , (x) => console.log(x.toJS())
)

const fake = (id) => ({
    id
    , name: `user${id}`
    , best_friend_id: id + 1
});

const Db = ({
    find: (id) =>
        Task((rej, res) =>
            setTimeout(
                () => res(
                    id > 2
                    ? Right(fake(id))
                    : Left('not found')
                )
                , 100
            )
        )
});

const send = (code, json) => console.log(`sending ${code}: ${JSON.stringify(json)}`);

// natural transformation
// nt(a.map(f)) == nt(a).map(f)
// F a -> T a
const eitherToTask = (e) =>
    e.fold(
        Task.rejected
        , Task.of
    );

Db.find(4) // Task(Either(user))
    .chain(eitherToTask) // Task(User)
    .chain(user => Db.find(user.best_friend_id))
    .chain(eitherToTask)
    .fork(
        (error) => send(500, { error })
        , user => send(200, user)
    )







