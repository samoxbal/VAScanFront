const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, '.build'),
        filename: 'server.js'
    },
    target: 'node',
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new ProgressBarPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [
                    path.join(__dirname, 'server'),
                    path.join(__dirname, 'config')
                ]
            }
        ]
    },
    externals: nodeExternals()
};