const R = require('ramda');
// Definitions
// ====================
const Right = x =>
    ({
        chain: f => f(x),
        map: f => Right(f(x)),
        fold: (f, g) => g(x),
        toString: x

    })

const Left = x =>
    ({
        chain: f => Left(x),
        map: f => Left(x),
        fold: (f, g) => f(x),
        toString: `Left(${x})`

    })

const fromNullable = x => x != null ? Right(x) : Left(null) // !== null/undefined

const tryCatch = f => {
    try {
        return Right(f())

    } catch(e) {
        return Left(e)
    }
}

const log = R.tap(R.prop('log'), console);

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================


// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const street_ = user => {
    const address = user.address

    if(address) {
        return address.street

    } else {
        return 'no street'
    }
}

const street = ({ address }) =>
    fromNullable(address)
        .map(R.prop('street'))
        .fold(
            () => 'no street'
            , R.identity
        );

const streetTernary = ({ address }) => address ? address.street : 'no street';

const user = { address: { street: { name: "Willow"  }  } };
console.log(
    R.equals(
        street(user)
        , { name: "Willow" }
    )
);

console.log(
    R.equals(
        streetTernary(user)
        , { name: "Willow" }
    )
);

//QUnit.test("Ex1: street", assert => {
     //const user = { address: { street: { name: "Willow"  }  }  }
     //assert.deepEqual(street(user), {name: "Willow"})
     //assert.equal(street({}), "no street")

//})

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const streetName_ = user => {
    const address = user.address

    if(address) {
        const street = address.street

        if(street) {
            return street.name
        }
    }
    return 'no street'
};

const checkProp = (prop) => R.compose(
    fromNullable
    , R.prop(prop)
);

const streetName = (user) =>
    fromNullable(user)
        .chain(checkProp('address'))
        .chain(checkProp('street'))
        .map(R.prop('name'))
        .fold(
            () => 'no street'
            , R.identity
        );

const streetNameTernary = (user) =>
    user
    ? user.address
        ? user.address.street
            ? user.address.street.name
            : 'no street'
        : 'no street'
    : 'no street'

console.log(
    R.equals(
        streetNameTernary(user)
        , 'Willow'
    )
);

console.log(
    R.equals(
        streetNameTernary({})
        , 'no street'
    )
);

console.log(
    R.equals(
        streetNameTernary({ address: { street: null } })
        , 'no street'
    )
);

console.log(
    R.equals(
        streetName(user)
        , 'Willow'
    )
);

console.log(
    R.equals(
        streetName({})
        , 'no street'
    )
);

console.log(
    R.equals(
        streetName({ address: { street: null } })
        , 'no street'
    )
);

//QUnit.test("Ex1: streetName", assert => {
     //const user = { address: { street: { name: "Willow"  }  }  }
     //assert.equal(streetName(user), "Willow")
     //assert.equal(streetName({}), "no street")
     //assert.equal(streetName({ address: { street: null  }  }), "no street")

//})


// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================
const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i

const parseDbUrl_ = cfg => {
    try {
        const c = JSON.parse(cfg) // throws if it can't parse
        return c.url.match(DB_REGEX)

    } catch(e) {
        return null
    }
};

const parseDbUrl = (c) =>
    tryCatch(() => JSON.parse(c))
        .map(R.prop('url'))
        .map(R.match(DB_REGEX))
        .fold(
            () => null
            , R.identity
        );


const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'

console.log(
    R.equals(
        parseDbUrl(config)[1]
        , 'sally'
    )
);

console.log(
    R.equals(
        parseDbUrl()
        , null
    )
);

//QUnit.test("Ex1: parseDbUrl", assert => {
     //assert.equal(parseDbUrl(config)[1], "sally")
     //assert.equal(parseDbUrl(), null)

//})



// Ex3: Using Either and the functions above, refactor startApp
// =========================
const startApp_ = cfg => {
    const parsed = parseDbUrl(cfg)

    if(parsed) {
        const [_, user, password, db] = parsed
        return `starting ${db}, ${user}, ${password}`

    } else {
        return "can't get config"
    }
};

const startApp = (c) =>
    fromNullable(parseDbUrl(c))
        .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
        .fold(
            () => 'can\'t get config'
            , R.identity
        )

console.log(
    R.equals(
        startApp(config)
        , 'starting mydb, sally, muppets'
    )
);

console.log(
    R.equals(
        startApp()
        , 'can\'t get config'
    )
);

//QUnit.test("Ex3: startApp", assert => {
     //const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
     //assert.equal(String(startApp(config)), "starting mydb, sally, muppets")
     //assert.equal(String(startApp()), "can't get config")

//})
