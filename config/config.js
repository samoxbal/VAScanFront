const path = require('path');

const rootPath = path.normalize(__dirname + '/..');

module.exports = {
    development: {
        root: rootPath,
        app: {
            port: 3000
        }
    },
    production: {
        root: rootPath,
        app: {
            port: 8000
        }
    }
};