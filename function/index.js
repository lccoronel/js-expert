'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        console.log('this', this);
        console.log('arguments', arguments);
        this.showContent(filename)
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString());
    }
}

// watch(__filename, async (event, filename) => {
//     console.log('index.js!', event, filename);
// })

const file = new File()
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename])

