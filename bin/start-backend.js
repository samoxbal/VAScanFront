const webpack = require('webpack');
const config = require('../webpack.backend.config');

const compiler = webpack(config);
module.exports = compiler;