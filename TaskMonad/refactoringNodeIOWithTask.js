const { Task } = require('../types');
const fs = require('fs')
const path = require("path");
const R = require('ramda');

const p = (filename) => path.resolve('TaskMonad', filename);

const readFile = (pathFile, enc) =>
    Task(
        (rej, res) =>
            fs.readFile(pathFile, enc, (err, contents) =>
                err ? rej(err) : res(contents)
            )
    );

const writeFile = (pathFile, contents) =>
    Task(
        (rej, res) =>
            fs.writeFile(pathFile, contents, (err, contents) =>
                err ? rej(err) : res(contents)
            )
    );


const app_ = () =>

    fs.readFile(p('config.json'), 'utf-8', (err, contents) => {

        console.log(err, contents)

        if(err) throw err

        const newContents = contents.replace(/3/g, '6')

        fs.writeFile('config1.json', newContents, (err, _) => {
            if(err) throw err
            console.log('success!')
        })
    })

const app = () =>
    readFile(p('config.json'), 'utf-8') // Task(contents)
        .map(R.replace(/3/g, '6'))
        .chain((newContents) => writeFile('newConfig.json', newContents))

app().fork(console.error, () => console.log('success!'));

