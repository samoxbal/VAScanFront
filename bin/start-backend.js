const webpack = require('webpack');
const config = require('../webpack.backend.config');

const compiler = webpack(config);

compiler.run((err) => {
    if (err) {
        console.log(err);
    }
});