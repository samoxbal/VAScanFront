const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const frontendServer = new WebpackDevServer(webpack(config), {
    publicPath: '/static/',
    hot: true,
    historyApiFallback: true,
    inline: true,
    proxy: {
        "*": "http://localhost:3000"
    }
});

module.exports = frontendServer;
