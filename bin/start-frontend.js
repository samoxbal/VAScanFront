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

frontendServer.listen(3002, '127.0.0.1', () => {
    console.log('Frontend compiled');
});
