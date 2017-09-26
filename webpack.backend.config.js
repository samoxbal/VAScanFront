const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: ['./server.js'],
    output: {
        path: path.resolve(__dirname, '.build'),
        filename: 'server.js'
    },
    target: 'node',
    resolve: {
        extensions: ['.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ProgressBarPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.hbs$/,
                use: ['handlebars-template-loader'],
                include: [path.join(__dirname, 'server/views')]
            },
            {   test: /\.css$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    externals: nodeExternals(),
    watch: true
};